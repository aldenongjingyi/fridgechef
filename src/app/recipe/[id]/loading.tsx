import Skeleton from '@/components/ui/Skeleton';

export default function RecipeLoading() {
  return (
    <div className="min-h-screen bg-muted pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Skeleton className="h-5 w-32 mb-6" />
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-96 rounded-2xl lg:col-span-2" />
        </div>
      </div>
    </div>
  );
}
