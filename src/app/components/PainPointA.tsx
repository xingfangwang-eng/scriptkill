import React from 'react';

interface PainPointAProps {
  problemDescription: string;
  themeAccent: string;
}

export const PainPointA: React.FC<PainPointAProps> = ({ problemDescription, themeAccent }) => {
  return (
    <section className="mb-12">
      <h2 
        className="text-2xl font-bold text-slate-900 mb-4 pl-4"
        style={{ borderLeft: `4px solid ${themeAccent}` }}
      >
        The Problem
      </h2>
      <p className="text-lg leading-relaxed text-slate-600 mb-4">
        {problemDescription}
      </p>
      <p className="text-lg leading-relaxed text-slate-600">
        This challenge often leads to wasted development time, increased error rates, and
        inconsistent implementation across projects. Developers need a reliable solution to
        streamline this process and ensure best practices are followed.
      </p>
    </section>
  );
};