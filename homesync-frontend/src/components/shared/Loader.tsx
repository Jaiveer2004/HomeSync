"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  onLoadingComplete: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Waking up the server...",
    "Connecting...", 
    "Preparing your view...",
    "Almost ready..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 12 + 3;
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 350);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onLoadingComplete, loadingSteps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50">
      <div className="relative w-full max-w-sm p-8 text-center flex flex-col items-center">
        
        {/* Animated Glow behind Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        {/* Central Logo Container */}
        <div className="relative mb-6 mt-8 flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 relative z-10 transition-transform duration-500 hover:scale-105">
            {/* SVG Home Icon */}
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          
          {/* Circular SVG Progress Ring wrapped around the logo */}
          <svg className="absolute w-24 h-24 transform -rotate-90 z-0" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-slate-200"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="text-blue-500 transition-all duration-300 ease-out opacity-90"
              style={{
                strokeDasharray: `${2 * Math.PI * 46}`,
                strokeDashoffset: `${2 * Math.PI * 46 * (1 - progress / 100)}`,
              }}
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 tracking-tight mt-4">
          HomeSync
        </h1>

        {/* Loading Text & Subtle dots */}
        <div className="h-10 mt-2 flex flex-col items-center justify-center space-y-3">
          <p className="text-sm font-medium text-slate-500 animate-pulse transition-opacity duration-300">
            {loadingSteps[currentStep]}
          </p>
          <div className="flex space-x-1.5 align-middle">
            <div className="w-1.5 h-1.5 bg-blue-500/80 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-500/80 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-500/80 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}
