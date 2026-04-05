"use client";

import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

interface HeroBProps {
  title: string;
  themeAccent: string;
}

export const HeroB: React.FC<HeroBProps> = ({ title, themeAccent }) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logs = [
      'Pulling image: python:3.9-slim',
      'Creating container: scriptkill-worker',
      'Starting container...',
      'Installing dependencies: requests, python-dotenv',
      'Generating code...',
      'Writing Dockerfile...',
      'Writing docker-compose.yml...',
      '✅ Build completed successfully',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (logRef.current && index < logs.length) {
        const logLine = document.createElement('div');
        logLine.className = 'text-sm text-slate-300 mb-1';
        logLine.textContent = logs[index];
        logRef.current.appendChild(logLine);
        logRef.current.scrollTop = logRef.current.scrollHeight;
        index++;
      } else if (index >= logs.length) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-8">
          {title}
        </h1>
        <p className="text-lg leading-relaxed text-slate-600">
          Our tool generates production-ready code and Docker configurations in seconds,
          saving you hours of manual work and ensuring best practices are followed.
        </p>
      </div>
      <div className="bg-slate-900 border border-slate-700 p-6 h-64 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-400 text-sm">Docker Build Logs</span>
        </div>
        <div ref={logRef} className="font-mono">
          {/* Logs will be added here */}
        </div>
      </div>
    </div>
  );
};