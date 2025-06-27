import React from 'react';
import { Hash, Flame, Zap, TowerControl as GameController2, Music, Tv, DollarSign, Filter, Target } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  currentView: 'trends' | 'niches';
  onViewChange: (view: 'trends' | 'niches') => void;
}

export function Sidebar({ selectedCategory, onCategoryChange, currentView, onViewChange }: SidebarProps) {
  const categories = [
    { id: 'all', label: 'All Trends', icon: Flame, color: 'text-red-400', gradient: 'from-red-500 to-orange-500' },
    { id: 'memes', label: 'Memes', icon: Hash, color: 'text-purple-400', gradient: 'from-purple-500 to-pink-500' },
    { id: 'tech', label: 'Tech & AI', icon: Zap, color: 'text-blue-400', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'drama', label: 'Internet Drama', icon: Tv, color: 'text-pink-400', gradient: 'from-pink-500 to-rose-500' },
    { id: 'sports', label: 'Sports', icon: GameController2, color: 'text-orange-400', gradient: 'from-orange-500 to-yellow-500' },
    { id: 'music', label: 'Music & Audio', icon: Music, color: 'text-green-400', gradient: 'from-green-500 to-emerald-500' },
    { id: 'crypto', label: 'Crypto & Finance', icon: DollarSign, color: 'text-yellow-400', gradient: 'from-yellow-500 to-amber-500' },
  ];

  const viralAlerts = [
    { title: 'AI Tool Launch Alert', time: '2m ago', type: 'tech' },
    { title: 'Meme Format Breaking', time: '5m ago', type: 'memes' },
    { title: 'Celebrity Drama Unfolding', time: '12m ago', type: 'drama' },
  ];

  return (
    <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 h-screen overflow-y-auto">
      <div className="p-6">
        {/* Premium View Toggle */}
        <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 mb-8">
          <button
            onClick={() => onViewChange('trends')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              currentView === 'trends'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span>Trends</span>
          </button>
          <button
            onClick={() => onViewChange('niches')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              currentView === 'niches'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Niches</span>
          </button>
        </div>

        {currentView === 'trends' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Trend Categories</h2>
              <div className="p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                <Filter className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-3">
              {categories.map(category => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full group relative overflow-hidden`}
                  >
                    <div className={`flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r ' + category.gradient + ' text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : category.color}`} />
                      <span className="font-semibold text-lg">{category.label}</span>
                      {isSelected && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    {isSelected && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-20 rounded-2xl blur-xl`}></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3 shadow-lg shadow-red-500/50"></div>
                Live Viral Alerts
              </h3>
              <div className="space-y-4">
                {viralAlerts.map((alert, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl">
                    <p className="text-sm font-semibold text-red-300">{alert.title}</p>
                    <p className="text-xs text-red-400 mt-1">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl">
              <h3 className="font-bold text-white mb-3 text-lg">🔮 Viral Forecast</h3>
              <p className="text-sm text-gray-300 mb-4">
                AI predicts these topics will explode in the next 6 hours:
              </p>
              <div className="space-y-3">
                <div className="text-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-white font-medium">
                  #NewAIModel trending ↗️
                </div>
                <div className="text-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 text-white font-medium">
                  #GameUpdate viral potential ↗️
                </div>
              </div>
            </div>
          </>
        )}

        {currentView === 'niches' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Your Niches</h2>
              <div className="p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
                <Target className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-500/20 rounded-2xl">
                <h3 className="font-bold text-white mb-2 text-lg">Movie Industry Intel</h3>
                <p className="text-sm text-blue-200 mb-3">3 sources • 12 updates today</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-xs text-green-300 font-medium uppercase tracking-wider">Live monitoring</span>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-xl border border-green-500/20 rounded-2xl">
                <h3 className="font-bold text-white mb-2 text-lg">AI & Tech Radar</h3>
                <p className="text-sm text-green-200 mb-3">5 sources • 8 updates today</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-xs text-green-300 font-medium uppercase tracking-wider">Live monitoring</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4 text-lg">💡 Niche Ideas</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Gaming Industry News</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Fashion Brand Drops</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Crypto Project Updates</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Sports Team News</span>
                </div>
                <div className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Food Trend Spotting</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
