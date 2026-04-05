"use client";

import { useState, useEffect } from 'react';

const logMessages = [
  'Scanning for SaaS pricing...',
  'Found Zapier: $29/mo...',
  'Bypassing paywall...',
  'Analyzing API endpoints...',
  'Optimizing Docker configuration...',
  'Checking for security vulnerabilities...',
  'Generating deployment script...',
  'Testing automation workflow...',
  'Found Notion: $8/mo...',
  'Creating self-hosted alternative...',
  'Validating container health...',
  'Finalizing deployment plan...'
];

export default function LogDecorator() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = logMessages[Math.floor(Math.random() * logMessages.length)];
      const timestamp = new Date().toLocaleTimeString();
      const newLog = `[${timestamp}] ${randomMessage}`;
      
      setLogs(prev => {
        const updated = [...prev, newLog];
        if (updated.length > 5) {
          return updated.slice(-5);
        }
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg p-3 w-64 text-xs font-mono text-green-400 z-10">
      <div className="mb-2 text-slate-400 text-xs font-semibold">System Log</div>
      <div className="space-y-1">
        {logs.map((log, index) => (
          <div key={index} className="opacity-80">{log}</div>
        ))}
      </div>
    </div>
  );
}
