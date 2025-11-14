"use client";

import { useState } from "react";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogFilters({
  categories,
  onCategoryChange,
  onSearchChange,
  selectedCategory,
  searchQuery,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Show only first 6 categories initially on desktop
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={cn(
          "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors md:hidden",
          selectedCategory
            ? "border-blue-500 bg-blue-50 text-blue-600"
            : "border-gray-300 hover:bg-gray-50"
        )}
      >
        <Filter className="h-4 w-4" />
        <span>Categories</span>
        {selectedCategory && (
          <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
            1
          </span>
        )}
        <ChevronDown
          className={cn(
            "ml-auto h-4 w-4 transition-transform",
            isFilterOpen && "rotate-180"
          )}
        />
      </button>

      {/* Category Filters */}
      <div
        className={cn(
          "flex flex-wrap gap-2",
          !isFilterOpen && "hidden md:flex"
        )}
      >
        {/* All Posts Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            !selectedCategory
              ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          )}
        >
          All Posts
        </button>

        {/* Category Buttons */}
        {visibleCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
          >
            {category}
          </button>
        ))}

        {/* Show More/Less Button */}
        {categories.length > 6 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            {showAllCategories ? (
              <>Show Less</>
            ) : (
              <>+{categories.length - 6} More</>
            )}
          </button>
        )}

        {/* Clear Filter (Mobile) */}
        {selectedCategory && (
          <button
            onClick={() => onCategoryChange(null)}
            className="ml-auto text-sm text-blue-600 hover:underline md:hidden"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
