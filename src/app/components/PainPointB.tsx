import React from 'react';

interface PainPointBProps {
  problemDescription: string;
  themeAccent: string;
}

export const PainPointB: React.FC<PainPointBProps> = ({ problemDescription, themeAccent }) => {
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 p-3 text-left font-bold">Feature</th>
              <th className="border border-slate-200 p-3 text-left font-bold">SaaS Tools (e.g., Zapier)</th>
              <th className="border border-slate-200 p-3 text-left font-bold">ScriptKill</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Monthly Cost</td>
              <td className="border border-slate-200 p-3 text-red-600 font-bold">$29+ / month</td>
              <td className="border border-slate-200 p-3 text-green-600 font-bold">$0 / month</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Control</td>
              <td className="border border-slate-200 p-3">Limited (vendor lock-in)</td>
              <td className="border border-slate-200 p-3">Full control (self-hosted)</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Customization</td>
              <td className="border border-slate-200 p-3">Restricted by vendor</td>
              <td className="border border-slate-200 p-3">Fully customizable</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Privacy</td>
              <td className="border border-slate-200 p-3">Data sent to third-party</td>
              <td className="border border-slate-200 p-3">Data stays on your server</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="border border-slate-200 p-3">Scalability</td>
              <td className="border border-slate-200 p-3">Limited by plan</td>
              <td className="border border-slate-200 p-3">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};