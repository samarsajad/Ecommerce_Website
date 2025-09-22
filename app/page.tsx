import { Suspense } from 'react';
import HomePageClient from './HomePageClient';


export default function HomePage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-8">Loading products...</div>}>
      <HomePageClient />
    </Suspense>
  );
}