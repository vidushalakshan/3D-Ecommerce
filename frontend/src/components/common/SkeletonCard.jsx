
import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex-shrink-0 w-[300px] h-[400px] border border-gray-200 p-4 rounded-xl shadow-md mx-3 bg-gray-50 animate-pulse flex flex-col gap-4">
      <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
      <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      <div className="mt-auto flex gap-2">
        <div className="w-24 h-10 bg-gray-200 rounded-full"></div>
        <div className="w-24 h-10 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
