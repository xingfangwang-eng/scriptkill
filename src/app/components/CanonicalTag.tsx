'use client';

import { usePathname } from 'next/navigation';

const CanonicalTag = () => {
  const pathname = usePathname();
  const canonicalUrl = `https://scriptkill.ai${pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
};

export default CanonicalTag;
