import { useState } from 'react';
import { Plus, Eye, Settings, Users, Clock, ExternalLink, Filter, Search } from 'lucide-react';
import { NichePage } from '../types';
import { mockNichePages, getNicheUpdatesByPageId } from '../data/mockNiches';

interface NicheMonitorProps {
  onCreateNiche: () => void;
}

export function NicheMonitor({ onCreateNiche }: NicheMonitorProps) {
  const [selectedPage, setSelectedPage] = useState<NichePage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredPages = mockNichePages.filter(page => {
    const matchesSearch = page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || page.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(mockNichePages.map(p => p.category.toLowerCase())))];

  if (selectedPage) {
    return <NichePageView page={selectedPage} onBack={() => setSelectedPage(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Niche Monitoring</h2>
          <p className="text-gray-600 mt-1">Create custom dashboards to track specific sources and topics</p>
        </div>
        <button
          onClick={onCreateNiche}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Niche Page</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search niche pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map(page => (
          <div key={page.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className={`h-32 bg-gradient-to-r ${page.color} relative`}>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  page.isPublic ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {page.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold">{page.name}</h3>
                <p className="text-sm opacity-90">{page.category}</p>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{page.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{page.sources.length} sources</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Created {new Date(page.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {page.keywords.slice(0, 3).map((keyword, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    #{keyword}
                  </span>
                ))}
                {page.keywords.length > 3 && (
                  <span className="text-xs text-gray-500">+{page.keywords.length - 3} more</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedPage(page)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Updates</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No niche pages found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or create a new niche page to get started.</p>
          <button
            onClick={onCreateNiche}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Niche Page
          </button>
        </div>
      )}
    </div>
  );
}

// @ts-ignore
import { NicheUpdate } from '../types';

interface NichePageViewProps {
  page: NichePage;
  onBack: () => void;
}

function NichePageView({ page, onBack }: NichePageViewProps) {
  const updates: NicheUpdate[] = getNicheUpdatesByPageId(page.id);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'link': return '🔗';
      default: return '📝';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'twitter': return 'bg-blue-100 text-blue-800';
      case 'instagram': return 'bg-pink-100 text-pink-800';
      case 'youtube': return 'bg-red-100 text-red-800';
      case 'tiktok': return 'bg-gray-900 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ←
        </button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{page.name}</h2>
          <p className="text-gray-600">{page.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            page.isPublic ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {page.isPublic ? 'Public' : 'Private'}
          </span>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Monitored Sources</h3>
            <div className="space-y-3">
              {page.sources.map(source => (
                <div key={source.id} className="flex items-center space-x-3">
                  <img
                    src={source.avatar}
                    alt={source.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{source.name}</p>
                    <p className="text-xs text-gray-500">{source.handle}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${source.isActive ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Latest Updates</h3>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Updates</option>
                  <option value="text">Text Posts</option>
                  <option value="image">Images</option>
                  <option value="video">Videos</option>
                  <option value="link">Links</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {updates.map(update => (
                <div key={update.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                        {getMediaIcon(update.mediaType)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">{update.sourceName}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(update.platform)}`}>
                          {update.platform}
                        </span>
                        <span className="text-sm text-gray-500">{update.timestamp}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{update.title}</h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{update.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {update.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{update.engagement}</span>
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
