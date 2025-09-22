"use client";

import { useState } from 'react';
import { FilterPanel } from './Filter';
import { PriceRangeSlider } from './PriceSlider';
import { colors } from '@/data/products';
import { FilterList } from './FilterList';

type ItemCount = { name: string; count: number };

type SidebarProps = {
  categories: ItemCount[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  brands: ItemCount[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  selectedColors: string[];
  onColorChange: (color: string) => void;
  priceRange: [number, number];
  onPriceChange: (values: [number, number]) => void;
};

const INITIAL_BRAND_COUNT = 5;

export const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrands,
  onBrandChange,
  selectedColors,
  onColorChange,
  priceRange,
  onPriceChange,
}: SidebarProps) => {

  const [visibleBrands, setVisibleBrands] = useState(INITIAL_BRAND_COUNT);

  
  const handleToggleBrands = () => {
    setVisibleBrands(prevCount => 
      prevCount === INITIAL_BRAND_COUNT ? brands.length : INITIAL_BRAND_COUNT
    );
  };

  const areAllBrandsShown = visibleBrands === brands.length;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <FilterPanel title="Hot Deals">
        <FilterList
          items={categories}
          selectedItems={[selectedCategory]}
          onSelectItem={onCategoryChange}
          visibleItemCount={categories.length}
          isMultiSelect={false}
        />
      </FilterPanel>

      <FilterPanel title="PRICES">
        <PriceRangeSlider
          values={priceRange}
          onValueChange={onPriceChange}
        />
      </FilterPanel>
      
      <FilterPanel title="COLOR">
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => onColorChange(color.hex)}
              className={`h-8 w-8 rounded-full border-2 transition-all duration-200 ${
                selectedColors.includes(color.hex)
                  ? 'scale-110 border-transparent ring-2 ring-offset-2 ring-blue-600'
                  : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            />
          ))}
        </div>
      </FilterPanel>

      <FilterPanel title="BRAND">
        <FilterList
          items={brands}
          selectedItems={selectedBrands}
          onSelectItem={onBrandChange}
          visibleItemCount={visibleBrands}
          isMultiSelect
        />
      </FilterPanel>

     
      {brands.length > INITIAL_BRAND_COUNT && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <button
            onClick={handleToggleBrands}
            className="w-full text-center font-bold text-gray-600 hover:text-blue-600"
          >
            
            {areAllBrandsShown ? 'LESS' : 'MORE'}
          </button>
        </div>
      )}
    </aside>
  );
};

