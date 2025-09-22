"use client";

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';

type FilterPanelProps = {
  title: string;
  children: React.ReactNode;
};

export const FilterPanel = ({ title, children }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between mb-4"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <ChevronUp
          className={`h-5 w-5 transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

