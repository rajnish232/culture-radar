import React, { useState, useEffect } from 'react';

export interface FilterState {
  viralScore: { min: number; max: number };
  categories: string[];
  platforms: string[];
  timeRange: string;
}

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterState) => void;
  onClearFilters: () => void;
  activeFilters: FilterState | null;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApplyFilters, onClearFilters, activeFilters }) => {
  const [viralScoreMin, setViralScoreMin] = useState(activeFilters?.viralScore.min || 0);
  const [viralScoreMax, setViralScoreMax] = useState(activeFilters?.viralScore.max || 100);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(activeFilters?.categories || []);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(activeFilters?.platforms || []);
  const [selectedTimeRange, setSelectedTimeRange] = useState(activeFilters?.timeRange || 'all');

  useEffect(() => {
    if (activeFilters) {
      setViralScoreMin(activeFilters.viralScore.min);
      setViralScoreMax(activeFilters.viralScore.max);
      setSelectedCategories(activeFilters.categories);
      setSelectedPlatforms(activeFilters.platforms);
      setSelectedTimeRange(activeFilters.timeRange);
    } else {
      setViralScoreMin(0);
      setViralScoreMax(100);
      setSelectedCategories([]);
      setSelectedPlatforms([]);
      setSelectedTimeRange('all');
    }
  }, [activeFilters]);

  const handleApply = () => {
    onApplyFilters({
      viralScore: { min: viralScoreMin, max: viralScoreMax },
      categories: selectedCategories,
      platforms: selectedPlatforms,
      timeRange: selectedTimeRange,
    });
  };

  const handleClear = () => {
    onClearFilters();
  };

  const allCategories = ['Memes', 'Crypto', 'Tech', 'Drama', 'Sports', 'Music', 'Food', 'Entertainment News', 'Movies', 'AI/Tech', 'Tech News']; // Example categories
  const allPlatforms = ['Reddit', 'Twitter', 'TikTok', 'Instagram', 'YouTube']; // Example platforms
  const timeRanges = ['all', '1h', '24h', '7d']; // Example time ranges

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <h3 className="text-lg font-bold mb-4">Advanced Filters</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Viral Score:</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={viralScoreMin}
            onChange={(e) => setViralScoreMin(Number(e.target.value))}
            className="w-20 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            min="0"
            max="100"
          />
          <span>-</span>
          <input
            type="number"
            value={viralScoreMax}
            onChange={(e) => setViralScoreMax(Number(e.target.value))}
            className="w-20 p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Categories:</label>
        <div className="flex flex-wrap gap-2">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategories(prev => 
                  prev.includes(category) 
                    ? prev.filter(c => c !== category) 
                    : [...prev, category]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.includes(category) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Platforms:</label>
        <div className="flex flex-wrap gap-2">
          {allPlatforms.map(platform => (
            <button
              key={platform}
              onClick={() => {
                setSelectedPlatforms(prev => 
                  prev.includes(platform) 
                    ? prev.filter(p => p !== platform) 
                    : [...prev, platform]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedPlatforms.includes(platform) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">Time Range:</label>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
        >
          {timeRanges.map(range => (
            <option key={range} value={range}>
              {range === 'all' ? 'All Time' : `Last ${range}`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-medium"
        >
          Clear Filters
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
