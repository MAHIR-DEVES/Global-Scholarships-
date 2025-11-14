"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blog.service";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostPage() {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => blogService.getBlogBySlug(slug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="animate-pulse">
            <div className="mb-8 h-8 w-32 rounded bg-gray-200"></div>
            <div className="mb-4 h-10 w-3/4 rounded bg-gray-200"></div>
            <div className="mb-8 h-6 w-1/2 rounded bg-gray-200"></div>
            <div className="h-96 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Post not found</h2>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back Button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              </time>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImageUrl[0] && (
          <div className="mb-8 h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={post.coverImageUrl[0]}
              alt={post.title}
              width={800}
              height={400}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || post.excerpt }}
        />
      </div>
    </article>
  );
}
