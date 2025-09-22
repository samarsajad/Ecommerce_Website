import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};


export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <div className={`absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded ${className}`}>
      {children}
    </div>
  );
};