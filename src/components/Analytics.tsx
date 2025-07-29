import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Eye, Clock, Globe, Zap, Target, Calendar, Download, Share, RefreshCw } from 'lucide-react';

interface AnalyticsData {
  totalTrends: number;
  viralPredictions: number;
  accuracyRate: number;
  avgDetectionTime: string;
  platformBreakdown: { platform: string; count: number; percentage: number }[];
  categoryBreakdown: { category: string; count: number; percentage: number }[];
  timelineData: { date: string; predictions: number; accuracy: number }[];
  topTrends: { title: string; score: number; platform: string }[];
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData>({
    totalTrends: 2847,
    viralPredictions: 156,
    accuracyRate: 94.2,
    avgDetectionTime: '6.2 hours',
    platformBreakdown: [
      { platform: 'TikTok', count: 1024, percentage: 36 },
      { platform: 'Twitter', count: 853, percentage: 30 },
      { platform: 'Instagram', count: 568, percentage: 20 },
      { platform: 'YouTube', count: 284, percentage: 10 },
      { platform: 'Reddit', count: 118, percentage: 4 }
    ],
    categoryBreakdown: [
      { category: 'Tech', count: 712, percentage: 25 },
      { category: 'Memes', count: 569, percentage: 20 },
      { category: 'Entertainment', count: 427, percentage: 15 },
      { category: 'Sports', count: 341, percentage: 12 },
      { category: 'Music', count: 284, percentage: 10 },
      { category: 'Other', count: 514, percentage: 18 }
    ],
    timelineData: [
      { date: '2024-01-01', predictions: 45, accuracy: 92 },
      { date: '2024-01-02', predictions: 52, accuracy: 94 },
      { date: '2024-01-03', predictions: 38, accuracy: 96 },
      { date: '2024-01-04', predictions: 61, accuracy: 93 },
      { date: '2024-01-05', predictions: 47, accuracy: 95 },
      { date: '2024-01-06', predictions: 55, accuracy: 94 },
      { date: '2024-01-07', predictions: 49, accuracy: 97 }
    ],
    topTrends: [
      { title: 'AI Tool Launch Goes Viral', score: 96, platform: 'Twitter' },
      { title: 'New Meme Format Explodes', score: 94, platform: 'TikTok' },
      { title: 'Celebrity Drama Unfolds', score: 92, platform: 'Instagram' },
      { title: 'Gaming Update Trends', score: 89, platform: 'YouTube' },
      { title: 'Crypto News Spreads', score: 87, platform: 'Reddit' }
    ]
  });

  // Initialize Google Analytics
  useEffect(() => {
    // Google Analytics 4 initialization
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: 'Analytics Dashboard',
      page_location: window.location.href
    });

    // Track page view
    gtag('event', 'page_view', {
      page_title: 'Analytics Dashboard',
      page_location: window.location.href
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Track analytics refresh event
    if (window.gtag) {
      window.gtag('event', 'analytics_refresh', {
        event_category: 'engagement',
        event_label: timeRange
      });
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleExport = () => {
    // Track export event
    if (window.gtag) {
      window.gtag('event', 'analytics_export', {
        event_category: 'engagement',
        event_label: 'csv_download'
      });
    }
    
    // Generate CSV data
    const csvData = [
      ['Metric', 'Value'],
      ['Total Trends', data.totalTrends],
      ['Viral Predictions', data.viralPredictions],
      ['Accuracy Rate', `${data.accuracyRate}%`],
      ['Avg Detection Time', data.avgDetectionTime]
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${timeRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const timeRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-gray-400">AI prediction performance and trend insights</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-white"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-3 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">Total Trends</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{data.totalTrends.toLocaleString()}</div>
            <div className="text-sm text-green-400">+12% from last period</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Viral Predictions</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{data.viralPredictions}</div>
            <div className="text-sm text-green-400">+8% accuracy</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-400">Accuracy Rate</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{data.accuracyRate}%</div>
            <div className="text-sm text-green-400">Industry leading</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Avg Detection</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{data.avgDetectionTime}</div>
            <div className="text-sm text-green-400">Before viral</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Platform Distribution</span>
          </h3>
          
          <div className="space-y-4">
            {data.platformBreakdown.map((platform, index) => (
              <div key={platform.platform} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-400' :
                    index === 1 ? 'bg-green-400' :
                    index === 2 ? 'bg-purple-400' :
                    index === 3 ? 'bg-orange-400' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-gray-300">{platform.platform}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-400' :
                        index === 1 ? 'bg-green-400' :
                        index === 2 ? 'bg-purple-400' :
                        index === 3 ? 'bg-orange-400' : 'bg-gray-400'
                      }`}
                      style={{ width: `${platform.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{platform.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Category Distribution</span>
          </h3>
          
          <div className="space-y-4">
            {data.categoryBreakdown.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-red-400' :
                    index === 1 ? 'bg-yellow-400' :
                    index === 2 ? 'bg-pink-400' :
                    index === 3 ? 'bg-cyan-400' :
                    index === 4 ? 'bg-indigo-400' : 'bg-gray-400'
                  }`}></div>
                  <span className="text-gray-300">{category.category}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-red-400' :
                        index === 1 ? 'bg-yellow-400' :
                        index === 2 ? 'bg-pink-400' :
                        index === 3 ? 'bg-cyan-400' :
                        index === 4 ? 'bg-indigo-400' : 'bg-gray-400'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium w-12 text-right">{category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Prediction Timeline</span>
        </h3>
        
        <div className="h-64 flex items-end space-x-2">
          {data.timelineData.map((day, index) => (
            <div key={day.date} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-800 rounded-t-lg relative" style={{ height: `${(day.predictions / 70) * 100}%` }}>
                <div 
                  className="w-full bg-blue-400 rounded-t-lg absolute bottom-0"
                  style={{ height: `${(day.accuracy / 100) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-600 rounded"></div>
            <span className="text-sm text-gray-400">Predictions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-sm text-gray-400">Accuracy</span>
          </div>
        </div>
      </div>

      {/* Top Performing Trends */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Top Performing Predictions</span>
        </h3>
        
        <div className="space-y-3">
          {data.topTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-white">{trend.title}</h4>
                  <p className="text-sm text-gray-400">{trend.platform}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{trend.score}%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Analytics Integration Info */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Google Analytics Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="font-medium text-white mb-2">Page Views</h4>
            <div className="text-2xl font-bold text-white">12,847</div>
            <div className="text-sm text-green-400">+15% this week</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="font-medium text-white mb-2">User Sessions</h4>
            <div className="text-2xl font-bold text-white">8,234</div>
            <div className="text-sm text-green-400">+8% this week</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="font-medium text-white mb-2">Avg Session Duration</h4>
            <div className="text-2xl font-bold text-white">4:32</div>
            <div className="text-sm text-green-400">+12% this week</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
