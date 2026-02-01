import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

const categories = ['Creativity', 'Content', 'Social', 'Code', 'Build'];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 w-full max-w-3xl animate-in slide-in-from-bottom-4 duration-700 delay-200">
      <button
        onClick={() => onSelect(null)}
        className={`
          px-5 py-2 md:px-6 md:py-3 
          text-sm md:text-base font-bold uppercase tracking-wide
          border-2 border-black transition-all duration-300
          ${!selectedCategory 
            ? 'bg-[#ccff00] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' 
            : 'bg-transparent text-black hover:bg-gray-100'
          }
        `}
      >
        All
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === selectedCategory ? null : cat)}
          className={`
            px-5 py-2 md:px-6 md:py-3 
            text-sm md:text-base font-bold uppercase tracking-wide
            border-2 border-black transition-all duration-300
            ${selectedCategory === cat
              ? 'bg-[#ccff00] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
              : 'bg-transparent text-black hover:bg-gray-100'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;