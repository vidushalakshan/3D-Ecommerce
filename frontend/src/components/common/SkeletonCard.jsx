import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative w-full h-[550px] flex flex-col bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 animate-pulse overflow-hidden">
      {/* Tag Skeleton */}
      <div className="absolute top-8 left-8 flex flex-col gap-2">
        <div className="w-24 h-6 bg-white/10 rounded-full" />
      </div>

      {/* Image Skeleton */}
      <div className="relative w-full aspect-square mb-8 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-white/5 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="space-y-3 mb-6">
          <div className="w-1/3 h-3 bg-blue-500/20 rounded" />
          <div className="w-full h-8 bg-white/10 rounded-xl" />
          <div className="w-2/3 h-8 bg-white/10 rounded-xl" />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="w-20 h-8 bg-white/10 rounded" />
            <div className="w-12 h-3 bg-white/5 rounded" />
          </div>
          
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-white/5 rounded-2xl" />
            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
  );
};

export default SkeletonCard;
