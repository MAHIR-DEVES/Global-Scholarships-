'use client';

import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BlogCard({ post, className }) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-blue-100/50 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        className
      )}
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-400/10">
        {post.coverImageUrl[0] ? (
          <>
            <Image
              src={post.coverImageUrl[0]}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400">
            <span className="text-4xl font-bold text-white/30">Blog</span>
          </div>
        )}

        {/* Status Badge */}
        {post.status === 'draft' && (
          <span className="absolute right-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Draft
          </span>
        )}

        {/* Category Badges - Overlay on image */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 backdrop-blur-sm"
            >
              <Tag className="mr-1 h-3 w-3" />
              {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-600 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="mt-auto space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{post.author.name}</span>
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4 text-cyan-500" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
              </time>
            </div>
          </div>

          {/* Read More Button */}
          <div className="flex items-center justify-between">
            {post.categories.length > 2 && (
              <span className="text-xs text-gray-500 font-medium">
                +{post.categories.length - 2} more categories
              </span>
            )}

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center space-x-1 text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Overlay Link */}
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read more about ${post.title}`}
      >
        <span className="sr-only">Read more</span>
      </Link>
    </article>
  );
}
