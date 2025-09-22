import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8 bg-gray-100 p-2">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-100 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go to previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm font-medium ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 '
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-100 text-gray-700  disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go to next page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

