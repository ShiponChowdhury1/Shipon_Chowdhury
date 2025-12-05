'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/constants';

export function ProjectFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...CATEGORIES];

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className={`
              rounded-full px-6 py-2 transition-all duration-300
              ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                  : 'hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
              }
            `}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
