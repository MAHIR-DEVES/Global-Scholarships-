"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogSkeleton } from "@/components/blog/BlogSkeleton";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogService } from "@/services/blog.service";

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const [currentPage, setCurrentPage] = useState(() =>
    parseInt(searchParams.get("page") || "1")
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category")
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Fetch blog posts
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: [
      "blogs",
      currentPage,
      selectedCategory,
      debouncedSearch,
      itemsPerPage,
    ],
    queryFn: () =>
      blogService.getBlogPosts({
        page: currentPage,
        limit: itemsPerPage,
        status: "published",
        category: selectedCategory || undefined,
        q: debouncedSearch || undefined,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => blogService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });

  // Debounce search with useCallback
  const debouncedSearchUpdate = useCallback(
    debounce((value) => {
      setDebouncedSearch(value);
      setCurrentPage(1); // Reset to first page on new search
    }, 500),
    []
  );

  // Update debounced search when search query changes
  useEffect(() => {
    debouncedSearchUpdate(searchQuery);
  }, [searchQuery, debouncedSearchUpdate]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchQuery) params.set("q", searchQuery);
    if (currentPage > 1) params.set("page", currentPage.toString());

    const newUrl = params.toString() ? `/blog?${params.toString()}` : "/blog";
    router.push(newUrl, { scroll: false });
  }, [selectedCategory, searchQuery, currentPage, router]);

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (search) => {
    setSearchQuery(search);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top of content
    document.getElementById("blog-content")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!data?.meta) return [];

    const { pages } = data.meta;
    const pageNumbers = [];
    const maxVisible = 5;

    if (pages <= maxVisible) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    // Always show first page
    pageNumbers.push(1);

    // Calculate range around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(pages - 1, currentPage + 1);

    // Add ellipsis if needed
    if (start > 2) pageNumbers.push("...");

    // Add pages around current
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed
    if (end < pages - 1) pageNumbers.push("...");

    // Always show last page
    if (pages > 1) pageNumbers.push(pages);

    return pageNumbers;
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="mb-4 h-12 w-12 text-red-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </h2>
            <p className="mb-6 text-gray-600">
              We couldn't load the blog posts. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative mx-auto px-4">
          <h1 className="mb-4 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Scholarship Insights Blog
          </h1>
          <p className="mx-auto max-w-2xl text-center text-lg text-white/90 md:text-xl">
            Expert advice, success stories, and comprehensive guides to help you
            secure your dream scholarship
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div id="blog-content" className="container mx-auto px-4 py-12">
        {/* Filters Section */}
        <div className="mb-8">
          <BlogFilters
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>

        {/* Results Summary */}
        {!isLoading && data && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{data.data.length}</span>{" "}
              of <span className="font-semibold">{data.meta.total}</span> posts
              {selectedCategory && (
                <span className="ml-1">
                  in <span className="font-semibold">{selectedCategory}</span>
                </span>
              )}
              {searchQuery && (
                <span className="ml-1">
                  for "<span className="font-semibold">{searchQuery}</span>"
                </span>
              )}
            </p>

            {/* Items per page selector */}
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value={9}>9 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </select>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div
              className={cn(
                "relative transition-opacity duration-300",
                isFetching && "opacity-50"
              )}
            >
              {data?.data && data.data.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {data.data.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-12">
                  <div className="text-center">
                    <h3 className="mb-2 text-xl font-semibold text-gray-700">
                      No posts found
                    </h3>
                    <p className="mb-6 text-gray-500">
                      {searchQuery
                        ? `No results for "${searchQuery}"`
                        : selectedCategory
                        ? `No posts in ${selectedCategory}`
                        : "No blog posts available at this moment"}
                    </p>
                    {(searchQuery || selectedCategory) && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory(null);
                          setCurrentPage(1);
                        }}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Loading overlay for fetching state */}
              {isFetching && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              )}
            </div>

            {/* Pagination */}
            {data && data.meta.pages > 1 && (
              <nav
                className="mt-12 flex items-center justify-center"
                aria-label="Pagination"
              >
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                      currentPage === 1
                        ? "cursor-not-allowed border-gray-200 text-gray-400"
                        : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    )}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden items-center space-x-1 sm:flex">
                    {generatePageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === "..." ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => handlePageChange(page)}
                            className={cn(
                              "h-10 min-w-[40px] rounded-lg px-3 text-sm font-medium transition-all",
                              currentPage === page
                                ? "bg-blue-600 text-white shadow-md"
                                : "hover:bg-gray-100"
                            )}
                            aria-label={`Go to page ${page}`}
                            aria-current={
                              currentPage === page ? "page" : undefined
                            }
                          >
                            {page}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile Page Indicator */}
                  <div className="flex items-center space-x-2 sm:hidden">
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {data.meta.pages}
                    </span>
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === data.meta.pages}
                    className={cn(
                      "flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                      currentPage === data.meta.pages
                        ? "cursor-not-allowed border-gray-200 text-gray-400"
                        : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                    )}
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
