export function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-6">
          <div className="mb-3 flex gap-2">
            <div className="h-6 w-20 rounded-full bg-gray-200"></div>
            <div className="h-6 w-24 rounded-full bg-gray-200"></div>
          </div>
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-4 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200"></div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="h-4 w-24 rounded bg-gray-200"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
