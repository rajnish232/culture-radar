'use client';
import React from 'react';
import { TrendCard } from './TrendCard';
import { Trend } from '../types';
import { FilterState } from './AdvancedFilters';

interface TrendFeedProps {
  trends: Trend[];
  onExplainTrend: (trend: Trend) => void;
  searchQuery: string;
  totalAvailable: number;
  activeFilters: FilterState | null;
  onClearFilters: () => void;
  onUpgradeClick: () => void;
}

export default function TrendFeed({
  trends,
  onExplainTrend,
  searchQuery,
  totalAvailable,
  activeFilters,
  onClearFilters,
  onUpgradeClick,
}: TrendFeedProps) {
  const hasFilters = activeFilters && (
    activeFilters.viralScore.min !== 0 ||
    activeFilters.viralScore.max !== 100 ||
    activeFilters.categories.length > 0 ||
    activeFilters.platforms.length > 0 ||
    activeFilters.timeRange !== 'all'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Trends'}
        </h2>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {trends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend) => (
            <TrendCard
              key={trend.id}
              trend={trend}
              onExplainTrend={onExplainTrend}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg">
          <p className="text-gray-400 text-lg">No trends found matching your criteria.</p>
          {hasFilters && (
            <button
              onClick={onClearFilters}
              className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {totalAvailable > trends.length && (
        <div className="text-center py-4">
          <p className="text-gray-400">
            Showing {trends.length} of {totalAvailable} trends.
          </p>
          <button
            onClick={onUpgradeClick}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upgrade to view all trends
          </button>
        </div>
      )}
    </div>
  );
}
