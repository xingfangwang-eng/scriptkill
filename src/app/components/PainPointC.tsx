"use client";

import React, { useState } from 'react';

interface PainPointCProps {
  problemDescription: string;
  themeAccent: string;
}

export const PainPointC: React.FC<PainPointCProps> = ({ problemDescription, themeAccent }) => {
  const [checkedItems, setCheckedItems] = useState<{[key: string]: boolean}>({
    'Paying monthly fees for SaaS tools': false,
    'Dealing with vendor lock-in': false,
    'Limited customization options': false,
    'Wasting time on manual configurations': false,
    'Concerns about data privacy': false,
  });

  const toggleItem = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <section className="mb-12">
      <h2 
        className="text-2xl font-bold text-slate-900 mb-4 pl-4"
        style={{ borderLeft: `4px solid ${themeAccent}` }}
      >
        The Problem
      </h2>
      <p className="text-lg leading-relaxed text-slate-600 mb-6">
        {problemDescription}
      </p>
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Are you tired of:</h3>
        {Object.entries(checkedItems).map(([item, checked]) => (
          <div key={item} className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleItem(item)}
              className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label className="text-lg leading-relaxed text-slate-600">
              {item}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-slate-100 border border-slate-200 rounded-md">
        <p className="text-slate-700">
          If you checked any of these boxes, ScriptKill is for you. We help you replace expensive SaaS tools
          with self-hosted solutions that you control.
        </p>
      </div>
    </section>
  );
};