import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Trend } from '../types';

interface TrendCardProps {
  trend: Trend;
  onExplainTrend: (trend: Trend) => void;
}

export function TrendCard({ trend, onExplainTrend }: TrendCardProps) {
  const [explanation, setExplanation] = useState<string | null>(trend.explanation || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(!!trend.explanation);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trends/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trend: trend.title }),
      });
      const data = await response.json();
      if (response.ok) {
        setExplanation(data.explanation);
        setShowExplanation(true);
      } else {
        setExplanation(data.error || 'Failed to fetch explanation.');
        setShowExplanation(true);
      }
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('An error occurred while fetching the explanation.');
      setShowExplanation(true);
    } finally {
      setLoading(false);
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'reddit': return 'bg-orange-100 text-orange-800';
      case 'twitter': return 'bg-blue-100 text-blue-800';
      case 'tiktok': return 'bg-gray-900 text-white';
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'youtube': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-800 flex flex-col">
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(trend.platform)}`}>
            {trend.platform}
          </span>
          <span className="text-sm text-gray-400">{trend.timeAgo}</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{trend.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-3">{trend.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {trend.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Engagement: {trend.engagement}</span>
          <span className="font-bold text-green-400">Viral Score: {trend.viralScore}%</span>
        </div>

        {showExplanation && explanation && (
          <div className="mt-4 p-3 bg-gray-800 rounded-md border border-gray-700">
            <h4 className="font-semibold text-white mb-2">AI Explanation:</h4>
            <p className="text-gray-300 text-sm">{explanation}</p>
            <button
              onClick={() => setShowExplanation(false)}
              className="mt-3 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md transition-colors"
            >
              Hide Explanation
            </button>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-800 border-t border-gray-700 flex justify-between items-center">
        <button
          onClick={() => onExplainTrend(trend)}
          disabled={loading}
          className="flex-1 mr-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Explaining...' : 'Explain with AI'}
        </button>
        <a
          href={trend.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 ml-2 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          View Source
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>
    </div>
  );
}
