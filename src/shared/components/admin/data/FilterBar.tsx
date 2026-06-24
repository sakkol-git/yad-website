'use client';

import React from 'react';

interface FilterBarProps {
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  searchPlaceholder?: string;
  children?: React.ReactNode; 
}

export function FilterBar({ 
  onSearchChange, 
  searchValue = '', 
  searchPlaceholder = 'Search...',
  children 
}: FilterBarProps) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-md border border-outline-variant/30 mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
      <div className="relative w-full sm:max-w-md flex-1">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
          search
        </span>
        <input 
          type="text" 
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 bg-surface rounded-md border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow text-on-surface text-sm placeholder:text-on-surface-variant/70"
        />
      </div>
      
      {children && (
        <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
          {children}
        </div>
      )}
    </div>
  );
}
