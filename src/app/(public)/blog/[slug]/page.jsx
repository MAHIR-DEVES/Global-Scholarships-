"use client";

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/services/blog.service';
import { format } from 'date-fns';
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog-post', slug],
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
    queryKey: ['related-posts', post?.categories],
    queryFn: async () => {
      if (!post?.categories?.length) return [];
      const { data } = await blogService.getBlogPosts({
        category: post.categories[0].name,
        limit: 3,
      });
      return data.data.filter(p => p._id !== post._id).slice(0, 3);
    },
    enabled: !!post,
  });

  const calculateReadingTime = html => {
    const text = html?.replace(/<[^>]*>/g, '') || '';
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const handleLike = async () => {
    if (!post) return;

    const newHasLiked = !hasLiked;
    const newLikes = newHasLiked ? likes + 1 : Math.max(0, likes - 1);
    const action = newHasLiked ? 'like' : 'unlike';

    // Optimistic update
    setHasLiked(newHasLiked);
    setLikes(newLikes);

    if (newHasLiked) {
      localStorage.setItem(`liked-${post._id}`, 'true');
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
        localStorage.setItem(`liked-${post._id}`, 'true');
      } else {
        localStorage.removeItem(`liked-${post._id}`);
      }
      console.error('Failed to like/unlike post:', error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto max-w-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Post Not Found
            </h2>
            <p className="mb-8 text-gray-600">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-lg bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.contentHtml);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="container mx-auto max-w-7xl px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          {/* Categories */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mb-8 text-xl text-gray-600 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
                  {post.author.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-500">{post.author.email}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.coverImageUrl[0] && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.coverImageUrl[0]}
              alt={post.title}
              width={800}
              height={400}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 transition-colors',
                hasLiked
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              <Heart className={cn('h-5 w-5', hasLiked && 'fill-current')} />
              <span>{likes || 0}</span>
            </button>

            <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
              <MessageCircle className="h-5 w-5" />
              <span>0</span>
            </button>

            <button
              onClick={handleBookmark}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 transition-colors',
                isBookmarked
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              <Bookmark
                className={cn('h-5 w-5', isBookmarked && 'fill-current')}
              />
            </button>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-200">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            className="
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mb-6 [&_h1]:mt-12
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mb-4 [&_h2]:mt-10
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mb-3 [&_h3]:mt-8
              [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-6
              [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-700
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-6 [&_ul]:text-gray-700
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-6 [&_ol]:text-gray-700
              [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6
              [&_code]:bg-gray-100 [&_code]:text-gray-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
              [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:my-6
              [&_img]:rounded [&_img]:my-6 [&_img]:shadow-md
            "
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-lg font-medium text-gray-700">
              {post.author.name[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {post.author.name}
              </h3>
              <p className="mt-1 text-gray-600">
                {post.author.bio ||
                  'Writer and content creator sharing insights and experiences.'}
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">
              Related Articles
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(relatedPost => (
                <article key={relatedPost._id} className="group">
                  {relatedPost.coverImageUrl[0] && (
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={relatedPost.coverImageUrl[0]}
                        alt={relatedPost.title}
                        width={300}
                        height={200}
                        className="h-48 w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="mb-2 flex flex-wrap gap-2">
                    {relatedPost.categories.slice(0, 2).map((category, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <time dateTime={relatedPost.publishedAt}>
                      {format(
                        new Date(relatedPost.publishedAt),
                        'MMM dd, yyyy'
                      )}
                    </time>
                    <span>•</span>
                    <span>
                      {calculateReadingTime(relatedPost.contentHtml)} min read
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Comments</h2>
          <div className="rounded-lg border border-gray-200 p-8 text-center">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No comments yet
            </h3>
            <p className="mt-2 text-gray-500">
              Be the first to share your thoughts!
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

// Skeleton Component
function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
        </div>
      </header>

      <article className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <div className="mb-4 flex gap-2">
            <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="mb-6 space-y-3">
            <div className="h-8 w-3/4 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-8 w-1/2 rounded bg-gray-200 animate-pulse"></div>
          </div>
          <div className="mb-8 h-4 w-2/3 rounded bg-gray-200 animate-pulse"></div>
          <div className="flex items-center justify-between border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
                <div className="h-3 w-32 rounded bg-gray-200 animate-pulse"></div>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="h-4 w-20 rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-16 rounded bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mb-8 h-96 rounded-lg bg-gray-200 animate-pulse"></div>

        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
