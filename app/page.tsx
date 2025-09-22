import { Suspense } from 'react';
import HomePageClient from './HomePage';

function LoadingFallback() {
  return <h2>Loading...</h2>;
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomePageClient />
    </Suspense>
  );
}