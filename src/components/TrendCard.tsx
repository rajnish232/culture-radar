import { ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface TrendCardProps {
  title: string;
  subtitle: string;
  image: string | null | undefined;
  link: string;
}

export function TrendCard({ title, subtitle, image, link }: TrendCardProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const fetchExplanation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trends/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trend: title }),
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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {image && (image.startsWith('http') || image.startsWith('/')) && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{subtitle}</p>
        <div className="flex justify-between items-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
          >
            Read More
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
          <button
            onClick={fetchExplanation}
            disabled={loading}
            className="ml-2 px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Explaining...' : 'Explain Trend'}
          </button>
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">Explanation:</h4>
            <p className="text-gray-700 text-sm">{explanation}</p>
            <button
              onClick={() => setShowExplanation(false)}
              className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
