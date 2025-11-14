"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogCard({ post, className }) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:shadow-lg",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        {post.coverImageUrl[0] ? (
          <Image
            src={post.coverImageUrl[0]}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-4xl font-bold text-white/20">Blog</span>
          </div>
        )}

        {/* Status Badge */}
        {post.status === "draft" && (
          <span className="absolute right-2 top-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white">
            Draft
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Categories */}
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.slice(0, 3).map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
            >
              <Tag className="mr-1 h-3 w-3" />
              {category.name}
            </span>
          ))}
          {post.categories.length > 3 && (
            <span className="text-xs text-gray-500">
              +{post.categories.length - 3} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-xl font-bold tracking-tight text-gray-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>

          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), "MMM dd, yyyy")}
            </time>
          </div>
        </div>
      </div>

      {/* Read More Link - Overlay */}
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0"
        aria-label={`Read more about ${post.title}`}
      >
        <span className="sr-only">Read more</span>
      </Link>
    </article>
  );
}
