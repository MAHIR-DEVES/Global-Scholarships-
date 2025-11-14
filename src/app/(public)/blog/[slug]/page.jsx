// app/blog/[slug]/page.jsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { format } from "date-fns";
import {
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  BookOpen,
  Heart,
  MessageCircle,
  Bookmark,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BlogCard } from "@/components/blog/BlogCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { ShareButtons } from "@/components/blog/ShareButtons";

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

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      // Save to localStorage or send to API
      localStorage.setItem(`liked-${post._id}`, "true");
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
      localStorage.removeItem(`liked-${post._id}`);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
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
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Article */}
      <article className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 pb-20 pt-32">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-200 blur-3xl"></div>
          </div>

          <div className="container relative mx-auto max-w-6xl px-4">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center space-x-2 text-sm text-white/80">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white">{post.categories[0]?.name}</span>
            </nav>

            {/* Title and Meta */}
            <div className="mx-auto max-w-4xl">
              {/* Categories */}
              <div className="mb-6 flex flex-wrap gap-2">
                {post.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-white/20 p-0.5">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {post.author.name[0]}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">{post.author.name}</p>
                    <p className="text-sm text-white/70">{post.author.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                  </time>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{calculateReadingTime(post.contentHtml)} min read</span>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>
                    {post.contentHtml?.split(/\s+/).length || 0} words
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            {/* Main Content */}
            <div className="mx-auto w-full max-w-4xl">
              {/* Featured Image */}
              {post.coverImageUrl[0] && (
                <div className="-mt-24 mb-12 overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={post.coverImageUrl[0]}
                    alt={post.title}
                    width={1200}
                    height={600}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 transition-all",
                      hasLiked
                        ? "bg-red-50 text-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    <Heart
                      className={cn("h-5 w-5", hasLiked && "fill-current")}
                    />
                    <span>{likes || 0}</span>
                  </button>

                  <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
                    <MessageCircle className="h-5 w-5" />
                    <span>0</span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 transition-all",
                      isBookmarked
                        ? "bg-blue-50 text-blue-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    <Bookmark
                      className={cn("h-5 w-5", isBookmarked && "fill-current")}
                    />
                  </button>
                </div>

                <ShareButtons post={post} />
              </div>

              {/* Article Content */}
              <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
                <div
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-gray-700 prose-blockquote:italic prose-code:rounded prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:text-sm prose-code:font-mono prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-xl prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              </div>

              {/* Author Card */}
              <AuthorCard author={post.author} />

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="mb-8 text-3xl font-bold text-gray-900">
                    Related Articles
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <BlogCard key={relatedPost._id} post={relatedPost} />
                    ))}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Comments
                </h2>
                <p className="text-gray-600">Comments feature coming soon...</p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                <TableOfContents content={post.contentHtml} />

                {/* Newsletter */}
                <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                  <h3 className="mb-2 text-lg font-bold">Stay Updated</h3>
                  <p className="mb-4 text-sm text-white/90">
                    Get scholarship tips and updates delivered to your inbox
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="mb-3 w-full rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500"
                  />
                  <button className="w-full rounded-lg bg-white py-2 font-medium text-blue-600 transition-opacity hover:opacity-90">
                    Subscribe
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full bg-blue-600 p-3 text-white shadow-lg transition-all hover:bg-blue-700"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 pb-20 pt-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="animate-pulse">
            <div className="mb-6 flex gap-2">
              <div className="h-8 w-24 rounded-full bg-white/20"></div>
              <div className="h-8 w-32 rounded-full bg-white/20"></div>
            </div>
            <div className="mb-6 h-12 w-3/4 rounded bg-white/20"></div>
            <div className="mb-8 h-6 w-full rounded bg-white/20"></div>
            <div className="flex gap-6">
              <div className="h-10 w-32 rounded bg-white/20"></div>
              <div className="h-10 w-40 rounded bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="-mt-24 mb-12 h-96 rounded-2xl bg-gray-200"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-full rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
