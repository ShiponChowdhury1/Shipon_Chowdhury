'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      return;
    }

    setIsLoading(true);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 14.28; // approximately 14.28% every second = 7 seconds total
      });
    }, 1000); // Update every 1 second

    // Hide loading screen after 7 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isMounted || !isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: '#101828', zIndex: 9999 }}>
      <div className="text-center">
        {/* Profile Image */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/20 rounded-full animate-ping"></div>
          </div>
          <div className="relative">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-8 border-white shadow-2xl animate-pulse">
              <Image
                src="/shipon.jpg"
                alt="Shipon Chowdhury"
                width={160}
                height={160}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
          Shipon Chowdhury
        </h2>
        <p className="text-xl text-white/90 mb-8">Junior Full-Stack Developer</p>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto mb-4">
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-white/80 text-sm font-medium">{progress}%</p>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>

        <p className="text-white/60 text-xs mt-8">Loading portfolio...</p>
      </div>
    </div>
  );
}
