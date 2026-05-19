"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + Math.random() * 12 + 4;
        return Math.min(next, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className='fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-md transition-all duration-500'
      style={{ background: "var(--bg)" }}
    >
      <div
        className='w-48 h-1.5 rounded-full relative overflow-hidden'
        style={{ background: "var(--border)" }}
      >
        <div
          className='absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out'
          style={{
            width: `${progress}%`,
            background: "var(--ink)",
            boxShadow: "0 0 8px var(--ink)",
          }}
        />
      </div>

      <div className='mt-4 flex flex-col items-center gap-1'>
        <p
          className='text-xs font-bold uppercase tracking-[0.25em] opacity-80'
          style={{ color: "var(--ink-3)" }}
        >
          Loading
        </p>
        <span
          className='text-[10px] font-mono font-medium tracking-normal opacity-60'
          style={{ color: "var(--ink-3)" }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
