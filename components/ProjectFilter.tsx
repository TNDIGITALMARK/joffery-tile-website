'use client';

import { useState } from 'react';

const filters = [
  { 
    id: 'all', 
    label: 'All Projects',
    icon: '🏠',
    description: 'View all our transformation projects'
  },
  { 
    id: 'bathroom', 
    label: 'Bathroom',
    icon: '🛁',
    description: 'Bathroom renovations and installations'
  },
  { 
    id: 'kitchen', 
    label: 'Kitchen',
    icon: '🍳',
    description: 'Kitchen backsplashes and surfaces'
  },
  { 
    id: 'flooring', 
    label: 'Flooring',
    icon: '🏢',
    description: 'Floor tile installations'
  },
  { 
    id: 'commercial', 
    label: 'Commercial',
    icon: '🏬',
    description: 'Commercial and office spaces'
  },
  { 
    id: 'outdoor', 
    label: 'Outdoor',
    icon: '🌿',
    description: 'Outdoor patios and exteriors'
  }
];

interface ProjectFilterProps {
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}

export function ProjectFilter({ onFilterChange, activeFilter = 'all' }: ProjectFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState(activeFilter);

  const handleFilterClick = (filterId: string) => {
    setSelectedFilter(filterId);
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Filter Transformations</h3>
        <p className="text-gray-600 text-sm">Choose a category to see specific project types</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`group relative p-4 rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
              selectedFilter === filter.id
                ? 'bg-blue-700 text-white shadow-lg ring-2 ring-blue-300'
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="text-2xl mb-2">{filter.icon}</div>
            <div className={`text-sm font-medium mb-1 ${
              selectedFilter === filter.id ? 'text-white' : 'text-gray-900'
            }`}>
              {filter.label}
            </div>
            <div className={`text-xs ${
              selectedFilter === filter.id ? 'text-blue-100' : 'text-gray-500 group-hover:text-blue-600'
            }`}>
              {filter.description}
            </div>
            
            {/* Selection indicator */}
            {selectedFilter === filter.id && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Filter Statistics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span>500+ Total Projects</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>All Categories Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span>Before & After Views</span>
          </div>
        </div>
      </div>
    </div>
  );
}