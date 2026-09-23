export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100">
          <div className="h-56 skeleton" />
          <div className="p-5 space-y-3">
            <div className="h-3 skeleton w-1/3 rounded-full" />
            <div className="h-5 skeleton w-3/4 rounded-full" />
            <div className="h-4 skeleton w-1/2 rounded-full" />
            <div className="h-3 skeleton w-full rounded-full" />
            <div className="h-3 skeleton w-4/5 rounded-full" />
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <div className="h-7 skeleton w-24 rounded-full" />
              <div className="h-6 skeleton w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
