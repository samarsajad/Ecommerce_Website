import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center text-center px-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        
        Oops! The page you&apos;re looking for doesn&apos;t seem to exist. It might have been moved or deleted.
      </p>
      <Link 
        href="/" 
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </main>
  );
}