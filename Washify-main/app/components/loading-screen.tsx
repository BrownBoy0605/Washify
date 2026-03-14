import React from "react";

interface LoadingScreenProps {
  isVisible: boolean;
}

export default function LoadingScreen({ isVisible }: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black dark">
      {/* Spinner */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-700" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-white border-r-white" />
        </div>
        
        {/* Loading text */}
        <p className="text-center text-sm font-medium text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
}
