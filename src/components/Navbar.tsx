"use client";

import { ShoppingCart, Shirt, PersonStanding, ShoppingBag, Footprints, Watch, Grid } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/products';


const CategoryIcon = ({ name, size = 28 }: { name: string; size?: number }) => {
  switch (name.toLowerCase()) {
    case 'all': return <Grid size={size} />;
    case 'shirts': return <Shirt size={size} />;
    case 'dresses': return <PersonStanding size={size} />;
    case 'bags': return <ShoppingBag size={size} />;
    case 'sneakers': return <Footprints size={size} />;
    case 'watches': return <Watch size={size} />;
    
    default: return <Shirt size={size} />;
  }
};


const mobileNavItems = [{ name: 'All' }, ...categories];

export const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryClick = (category: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (category.toLowerCase() === 'home' || category.toLowerCase() === 'all' || category === selectedCategory) {
      current.delete('category');
    } else {
      current.set('category', category);
    }
    
    current.set('page', '1');
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`/${query}`);
  };

  return (
    <header className="bg-white shadow-sm relative z-20">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 text-3xl font-bold text-primary-blue">
          <img 
            src="https://placehold.co/40x40/409FFF/FFFFFF?text=E" 
            alt="E-Comm logo"
            className="rounded-full h-10 w-10"
          />
          <span className=" text-gray-700">E-Comm</span>
        </Link>
        
        <div className="hidden lg:flex items-center justify-center gap-8">
          <button
            onClick={() => handleCategoryClick('Home')}
            className={`whitespace-nowrap text-sm font-bold tracking-wider py-2 transition-colors ${
              !selectedCategory
                ? 'text-blue-600 border-b-2 border-primary-blue'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            HOME
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`whitespace-nowrap text-sm font-bold tracking-wider py-2 transition-colors ${
                selectedCategory === category.name
                  ? 'text-blue-600 border-b-2 border-primary-blue'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
          {/* desktop only */}
          <Link
            href="/contact"
            className="whitespace-nowrap text-sm font-bold tracking-wider py-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            CONTACT
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-2 text-gray-700">
            <ShoppingCart size={20} />
            <span className="hidden sm:inline">Items</span>
          </div>
          <span className="text-gray-400 hidden sm:inline">Rs0.00</span>
        </div>
      </div>
      {/*Mobile View */}
      <div className="lg:hidden border-t bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="overflow-x-auto pb-2 -mb-2 no-scrollbar">
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar { display: none; }
              .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="flex gap-4">
              {mobileNavItems.map((category) => {
                const isSelected = (category.name === 'All' && !selectedCategory) || selectedCategory === category.name;
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex flex-col items-center gap-2 flex-shrink-0 w-20"
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isSelected ? 'bg-blue-600 border-primary-blue text-primary-blue' : 'bg-gray-100 border-gray-200 text-gray-600'
                    }`}>
                      <CategoryIcon name={category.name} />
                    </div>
                    <span className={`text-xs text-center font-semibold ${isSelected ? 'text-primary-blue' : 'text-gray-700'}`}>{category.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

