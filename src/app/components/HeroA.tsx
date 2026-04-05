import React from 'react';
import { Terminal } from 'lucide-react';

interface HeroAProps {
  title: string;
  themeAccent: string;
}

export const HeroA: React.FC<HeroAProps> = ({ title, themeAccent }) => {
  return (
    <div className="mb-12">
      <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-8">
        {title}
      </h1>
      <div className="bg-slate-900 border border-slate-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400">$</span>
          <input
            type="text"
            defaultValue={`# Generate your solution`}
            className="bg-transparent border-none outline-none text-white flex-1 w-full font-mono focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-all duration-200"
          />
          <button 
            className="px-4 py-2 rounded-md transition-colors active:scale-95" 
            style={{ backgroundColor: themeAccent, color: '#000', fontWeight: 'bold' }}
          >
            Execute
          </button>
        </div>
      </div>
    </div>
  );
};