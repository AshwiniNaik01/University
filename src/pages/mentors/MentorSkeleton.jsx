export const MentorSkeleton = () => (
  <div className="bg-white shadow-2xl rounded-3xl p-10 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-center animate-pulse">
    <div className="text-center md:text-left flex flex-col items-center md:items-start">
      <div className="rounded-3xl w-44 h-44 bg-gray-300 mb-4" />
      <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-24 bg-gray-200 rounded" />

      <div className="flex gap-3 mt-4">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
    </div>

    <div className="md:col-span-2 space-y-6">
      <div>
        <div className="h-4 w-40 bg-gray-300 mb-2 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <div className="h-4 w-28 bg-gray-300 mb-3 rounded" />
          <ul className="space-y-2">
            <li className="h-3 w-3/4 bg-gray-200 rounded" />
            <li className="h-3 w-2/3 bg-gray-200 rounded" />
            <li className="h-3 w-1/2 bg-gray-200 rounded" />
          </ul>
        </div>
        <div>
          <div className="h-4 w-28 bg-gray-300 mb-3 rounded" />
          <ul className="space-y-2">
            <li className="h-3 w-3/4 bg-gray-200 rounded" />
            <li className="h-3 w-2/3 bg-gray-200 rounded" />
            <li className="h-3 w-1/2 bg-gray-200 rounded" />
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <div className="h-4 w-20 bg-gray-300 rounded" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);
