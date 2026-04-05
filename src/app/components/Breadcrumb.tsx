import Link from 'next/link';
import React from 'react';

interface BreadcrumbProps {
  items: Array<{ label: string; href: string; active?: boolean }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-2">/</span>}
          {item.active ? (
            <span className="text-slate-700 font-medium">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}