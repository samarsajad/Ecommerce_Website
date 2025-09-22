

import dynamic from 'next/dynamic';


const HomePageClient = dynamic(
  () => import('./HomePageClient'), 
  { 
    ssr: false,  
    loading: () => (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-semibold">🌀 Loading Products...</h2>
      </div>
    )
  }
);

export default function HomePage() {
 
  return <HomePageClient />;
}