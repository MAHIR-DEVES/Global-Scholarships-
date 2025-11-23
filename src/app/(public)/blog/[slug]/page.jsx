"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { format } from "date-fns";
import {
  Calendar,
  ArrowLeft,
  Clock,
  BookOpen,
  Heart,
  Bookmark,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShareButtons } from "@/components/blog/details/SharedButton";
import { TableOfContents } from "@/components/blog/details/TableOfContents";

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Fetch blog post
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => blogService.getBlogBySlug(slug),
  });

  // Initialize likes when post loads
  useEffect(() => {
    if (post) {
      const backendLikes = post.likes || 0;
      setLikes(backendLikes);

      // Check if user has already liked this post locally
      const liked = localStorage.getItem(`liked-${post._id}`);

      // If localStorage says liked but backend count is 0, clear localStorage
      if (liked && backendLikes === 0) {
        localStorage.removeItem(`liked-${post._id}`);
        setHasLiked(false);
      } else if (liked) {
        setHasLiked(true);
      }
    }
  }, [post]);

  // Fetch related posts
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ["related-posts", post?.categories],
    queryFn: async () => {
      if (!post?.categories?.length) return [];
      const { data } = await blogService.getBlogPosts({
        category: post.categories[0].name,
        limit: 3,
      });
      return data.data.filter((p) => p._id !== post._id).slice(0, 3);
    },
    enabled: !!post,
  });

  // Calculate reading time
  const calculateReadingTime = (html) => {
    const text = html?.replace(/<[^>]*>/g, "") || "";
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200); // Average reading speed
  };

  // Handle scroll progress and back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Progress bar
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);

      // Show scroll to top button
      setShowScrollTop(winScroll > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async () => {
    if (!post) return;

    const newHasLiked = !hasLiked;
    const newLikes = newHasLiked ? likes + 1 : Math.max(0, likes - 1); // Prevent negative
    const action = newHasLiked ? "like" : "unlike";

    // Optimistic update
    setHasLiked(newHasLiked);
    setLikes(newLikes);

    if (newHasLiked) {
      localStorage.setItem(`liked-${post._id}`, "true");
    } else {
      localStorage.removeItem(`liked-${post._id}`);
    }

    try {
      await blogService.likeBlogPost(post._id, action);
    } catch (error) {
      // Revert on error
      setHasLiked(!newHasLiked);
      setLikes(likes);
      if (!newHasLiked) {
        localStorage.setItem(`liked-${post._id}`, "true");
      } else {
        localStorage.removeItem(`liked-${post._id}`);
      }
      console.error("Failed to like/unlike post:", error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Save to localStorage or send to API
    if (!isBookmarked) {
      localStorage.setItem(`bookmarked-${post._id}`, "true");
    } else {
      localStorage.removeItem(`bookmarked-${post._id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Loading state
  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-md">
            <div className="mb-6 text-6xl">📝</div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Post Not Found
            </h2>
            <p className="mb-8 text-gray-600">
              The blog post you're looking for doesn't exist or has been moved.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gray-100">
        <div
          className="h-full bg-blue-600 transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-white pb-20 pt-24 overflow-x-hidden">
        {/* Container for the whole page content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Main Content Column (Left/Center) */}
            <main className="lg:col-span-8 min-w-0">

              {/* Header Section */}
              <header className="mb-10">
                {/* Categories */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900 tracking-tight break-words">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="mb-8 text-lg sm:text-xl text-gray-600 leading-relaxed break-words">
                  {post.excerpt}
                </p>

                {/* Author & Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-y border-gray-100 py-6">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                        </time>
                        <span className="hidden sm:inline">•</span>
                        <Clock className="h-4 w-4 ml-1" />
                        <span>{calculateReadingTime(post.contentHtml)} min read</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                     <ShareButtons post={post} />
                     <button
                        onClick={handleBookmark}
                        className={cn(
                          "p-2 rounded-full transition-colors",
                          isBookmarked
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                        )}
                        title="Bookmark"
                      >
                        <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
                      </button>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {post.coverImageUrl[0] && (
                <div className="mb-12 relative w-full aspect-video overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                  <Image
                    src={post.coverImageUrl[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg prose-slate max-w-none break-words
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-8
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-sm prose-img:w-full prose-img:h-auto
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-gray-900 prose-pre:text-gray-50 prose-pre:shadow-lg prose-pre:rounded-xl prose-pre:overflow-x-auto
              ">
                <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
              </div>

              {/* Tags/Footer of Article */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className={cn(
                            "flex items-center gap-2 rounded-full px-6 py-2.5 transition-all font-medium border",
                            hasLiked
                                ? "bg-red-50 text-red-600 border-red-100"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-red-200 hover:text-red-500"
                            )}
                        >
                            <Heart className={cn("h-5 w-5", hasLiked && "fill-current")} />
                            <span>{likes || 0} Likes</span>
                        </button>
                    </div>
                 </div>
              </div>

            </main>

            {/* Sidebar (Right) */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-32 space-y-8">

                {/* Table of Contents */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        Table of Contents
                    </h3>
                    <TableOfContents content={post.contentHtml} />
                </div>

                {/* Newsletter Widget */}
                <div className="rounded-2xl bg-blue-600 p-8 text-white shadow-lg relative overflow-hidden">
                   <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                   <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>

                  <h3 className="mb-2 text-xl font-bold relative z-10">Weekly Newsletter</h3>
                  <p className="mb-6 text-blue-100 text-sm relative z-10">
                    Join 10,000+ students getting scholarship updates.
                  </p>
                  <div className="space-y-3 relative z-10">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="w-full rounded-lg bg-white py-3 font-semibold text-blue-600 hover:bg-blue-50 transition-colors">
                        Subscribe Free
                    </button>
                  </div>
                </div>

                {/* Related Posts Widget */}
                {relatedPosts.length > 0 && (
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
                        <div className="space-y-4">
                            {relatedPosts.map(post => (
                                <Link key={post._id} href={`/blog/${post.slug}`} className="group block bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-200 hover:shadow-md transition-all">
                                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                                        {post.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Clock className="h-3 w-3" />
                                        <span>{calculateReadingTime(post.contentHtml)} min read</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full bg-blue-600 p-3 text-white shadow-xl transition-all hover:bg-blue-700 hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}

// Skeleton Component
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <main className="lg:col-span-8">
                <div className="animate-pulse space-y-8">
                    <div className="flex gap-2">
                        <div className="h-8 w-24 rounded-full bg-gray-200"></div>
                        <div className="h-8 w-32 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-12 w-3/4 rounded-lg bg-gray-200"></div>
                        <div className="h-12 w-1/2 rounded-lg bg-gray-200"></div>
                    </div>
                    <div className="h-6 w-full rounded bg-gray-200"></div>

                    <div className="flex items-center justify-between py-6 border-y border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-gray-200"></div>
                                <div className="h-3 w-24 rounded bg-gray-200"></div>
                            </div>
                        </div>
                    </div>

                    <div className="h-96 w-full rounded-2xl bg-gray-200"></div>

                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-4 w-full rounded bg-gray-200"></div>
                        ))}
                    </div>
                </div>
            </main>
            <aside className="hidden lg:block lg:col-span-4">
                <div className="space-y-8">
                    <div className="h-64 rounded-2xl bg-gray-200"></div>
                    <div className="h-48 rounded-2xl bg-gray-200"></div>
                </div>
            </aside>
        </div>
      </div>
    </div>
  );
}
