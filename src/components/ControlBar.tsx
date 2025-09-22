import { LayoutGrid, List } from 'lucide-react';

type ControlBarProps = {
  totalItems: number;
  sortOption: string;
  onSortChange: (value: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
};

export const ControlBar = ({
  totalItems,
  sortOption,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
  viewMode,
  onViewModeChange,
}: ControlBarProps) => {
  
  const customArrow = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a1a1aa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`;

  return (
    
    <div className="flex items-center justify-between mb-6 bg-gray-100 p-4">
      <p className="text-gray-600 font-medium">{totalItems} Items</p>

      <div className="flex items-center gap-6">
        <div>
          <label htmlFor="sort" className="mr-3 text-sm font-medium text-gray-600">Sort By</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 pr-8 rounded-md focus:outline-none focus:ring-0 focus:border-primary-blue"
            style={{
              backgroundImage: customArrow,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="name-asc">Name</option>
            <option value="popularity-desc">Popularity</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <label htmlFor="show" className="mr-3 text-sm font-medium text-gray-600">Show</label>
          <select
            id="show"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-600 text-sm px-3 py-1.5 pr-8 rounded-md focus:outline-none focus:ring-0 focus:border-primary-blue"
            style={{
              backgroundImage: customArrow,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>
{/* View Mode Toggle */}
      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          aria-label="Grid view"
        >
          <LayoutGrid size={20} />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          aria-label="List view"
        >
          <List size={20} />
        </button>
      </div>
    </div>
  );
};

