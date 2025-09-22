

import { Suspense } from 'react';
import HomePageClient from './HomePageClient';



function LoadingFallback() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      
      <h2 className="text-2xl font-semibold mt-6">Loading Products...</h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomePageClient />
    </Suspense>
  );
}