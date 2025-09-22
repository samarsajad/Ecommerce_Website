type ItemCount = { name: string; count: number };

type FilterListProps = {
  items: ItemCount[];
  selectedItems: string[];
  onSelectItem: (item: string) => void;
  visibleItemCount: number;
  isMultiSelect?: boolean; 
};

export const FilterList = ({
  items,
  selectedItems,
  onSelectItem,
  visibleItemCount,
  isMultiSelect = false, 
}: FilterListProps) => {
  return (
    <div className="space-y-3">
      {items.slice(0, visibleItemCount).map((item) => {
        
        const isSelected = selectedItems.includes(item.name);
        
        return (
          <button
            key={item.name}
            onClick={() => onSelectItem(item.name)}
            className="flex justify-between items-center w-full text-left text-gray-500 hover:text-blue-600 font-medium"
          >
            <span className={isSelected ? 'font-semibold text-blue-600' : ''}>
              {item.name}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-blue-100 text-blue-600 font-bold' : 'bg-gray-100 text-gray-500'}`}>
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

