"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Sidebar } from '@/components/SideBar';
import { Pagination } from '@/components/Pagination';
import { ControlBar } from '@/components/ControlBar';
import { mockProducts } from '@/data/products';
import { Product } from '@/lib/types';
import { ProductRow } from '@/components/ProductRow';
import { Filter, X } from 'lucide-react';

// Helper function for counts on sidebar
const getCounts = (products: Product[], key: keyof Product) => {
  const counts = products.reduce((acc, product) => {
    const value = product[key] as string;
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
};

const DEFAULT_PRICE_RANGE: [number, number] = [0, 50000];
const DEFAULT_ITEMS_PER_PAGE = 6;

export default function HomePageClient() { 
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // States
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('name-asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [priceRange, setPriceRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Syncing URL
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || '');
    setSelectedBrands(searchParams.get('brands')?.split(',').filter(Boolean) || []);
    setSelectedColors(searchParams.get('colors')?.split(',').filter(Boolean) || []);
    setSortOption(searchParams.get('sort') || 'name-asc');
    setCurrentPage(Number(searchParams.get('page')) || 1);
    setItemsPerPage(Number(searchParams.get('show')) || DEFAULT_ITEMS_PER_PAGE);
    const price = searchParams.get('price')?.split('-');
    if (price && price.length === 2) {
      setPriceRange([Number(price[0]), Number(price[1])]);
    } else {
      setPriceRange(DEFAULT_PRICE_RANGE);
    }
  }, [searchParams]);
  
  // Syncing Components
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    const updateParam = (key: string, value: string | null) => {
      if (value && value.toString().length > 0) params.set(key, value);
      else params.delete(key);
    };
    
    updateParam('category', selectedCategory);
    updateParam('brands', selectedBrands.join(','));
    updateParam('colors', selectedColors.join(','));
    updateParam('sort', sortOption === 'name-asc' ? null : sortOption);
    updateParam('page', currentPage > 1 ? String(currentPage) : null);
    updateParam('show', itemsPerPage !== DEFAULT_ITEMS_PER_PAGE ? String(itemsPerPage) : null);
    updateParam('price', (priceRange[0] !== DEFAULT_PRICE_RANGE[0] || priceRange[1] !== DEFAULT_PRICE_RANGE[1]) ? `${priceRange[0]}-${priceRange[1]}` : null);
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedCategory, selectedBrands, selectedColors, sortOption, currentPage, itemsPerPage, priceRange, router, pathname, searchParams]);
  
  const categoryCounts = useMemo(() => getCounts(mockProducts, 'category'), []);
  const brandCounts = useMemo(() => getCounts(mockProducts, 'brand'), []);

  // Filter Handler
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(prev => (prev === category ? '' : category));
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
    setCurrentPage(1);
  };

  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values);
    setCurrentPage(1);
  };
  
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredAndSortedProducts = useMemo(() => {
    const products: Product[] = mockProducts.filter(p => 
      (!selectedCategory || p.category === selectedCategory) &&
      (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
      (selectedColors.length === 0 || p.colors.some(color => selectedColors.includes(color))) &&
      (p.discountPrice >= priceRange[0] && p.discountPrice <= priceRange[1])
    );

    const [sortBy, order] = sortOption.split('-');
    products.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'price') comparison = a.discountPrice - b.discountPrice;
      else if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
      return order === 'asc' ? comparison : -comparison;
    });

    return products;
  }, [selectedCategory, selectedBrands, selectedColors, priceRange, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const cardColor = selectedColors.length === 1 ? selectedColors[0] : undefined;

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 w-full justify-center bg-white p-3 rounded-lg shadow-sm font-semibold text-gray-700"
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <Sidebar 
            categories={categoryCounts}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            brands={brandCounts}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            selectedColors={selectedColors}
            onColorChange={handleColorChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
          />
        </div>
        
        {/* Mobile Sidebar (Drawer) */}
        {isSidebarOpen && (
          
          <div className="lg:hidden fixed inset-0 z-40" onClick={() => setIsSidebarOpen(false)}>
           
            <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-blue-50 p-4 overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-xl">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <Sidebar 
                categories={categoryCounts}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                brands={brandCounts}
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
                selectedColors={selectedColors}
                onColorChange={handleColorChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
              />
            </div>
          </div>
        )}

        <div className="w-full">
          {/* Banner Section */}
          <div className="bg-blue-600 text-white p-10 mb-8 flex items-center justify-between shadow-lg">
            <div>
              <h1 className="text-3xl font-bold">Adidas Men Running</h1>
              <h2 className="text-6xl font-extrabold">Sneakers</h2>
              <p className="mt-2 text-blue-200">Performance and design. Taken right to the edge.</p>
              <button className="mt-6 font-bold text-white tracking-wider border-b-2 border-white pb-1">SHOP NOW</button>
            </div>
            <div className="w-1/4">
              <img src="/products/item2.webp" alt="Featured Sneaker" className="transform -rotate-15 transition-transform hover:scale-110" />
            </div>
          </div>

          <ControlBar
            totalItems={filteredAndSortedProducts.length}
            sortOption={sortOption}
            onSortChange={setSortOption}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          
          {paginatedProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map(product => ( <ProductCard key={product.id} product={product} selectedColor={cardColor} /> ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {paginatedProducts.map(product => ( <ProductRow key={product.id} product={product} selectedColor={cardColor} /> ))}
              </div>
            )
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters.</p>
              <button onClick={handleResetFilters} className="mt-4 px-4 py-2 bg-primary-blue text-white rounded">Reset Filters</button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

