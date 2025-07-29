import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import TrendFeed from '../../components/TrendFeed';
import { ChatInterface } from '../../components/ChatInterface';
import { NicheMonitor } from '../../components/NicheMonitor';
import { CreateNichePage } from '../../components/CreateNichePage';
import { DeepResearch } from '../../components/DeepResearch';
import { ScriptWriter } from '../../components/ScriptWriter';
import { Analytics } from '../../components/Analytics';
import { Settings } from '../../components/Settings';
import { PremiumModal } from '../../components/PremiumModal';
import ScrollProgress from '../../components/ScrollProgress';
import { FilterState } from '../../components/AdvancedFilters';
import { mockTrends, getTrendsByCategory, Trend } from '../../data/mockTrends';
import { useSubscription, SubscriptionFeatures } from '../../utils/useSubscription';

type DashboardView = 'trends' | 'niches' | 'research' | 'scriptwriter' | 'analytics' | 'settings';

function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['all']);
  const [selectedApps, setSelectedApps] = useState<string[]>(['all']);
  const [showChat, setShowChat] = useState(false);
  const [currentView, setCurrentView] = useState<DashboardView>('trends');
  const [showCreateNiche, setShowCreateNiche] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState<'' | 'niches' | 'platforms' | 'analytics' | 'scriptwriter' | 'research' | 'general' | keyof SubscriptionFeatures>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState | null>(null);

  const { currentTier, canAccessPlatform, canViewMoreTrends, hasFeature, upgradeTier } = useSubscription();

  // Apply filters to trends
  const applyFilters = (trends: Trend[], filters: FilterState | null): Trend[] => {
    if (!filters) return trends;

    return trends.filter(trend => {
      // Viral score filter
      if (trend.viralScore < filters.viralScore.min || trend.viralScore > filters.viralScore.max) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(trend.category)) {
        return false;
      }

      // Platform filter
      if (filters.platforms.length > 0 && !filters.platforms.includes(trend.platform)) {
        return false;
      }

      // Time range filter (simplified - in real app would check actual timestamps)
      // For demo purposes, we'll just filter based on timeAgo string
      if (filters.timeRange === '1h' && !trend.timeAgo.includes('mins')) {
        return false;
      }

      return true;
    });
  };

  // Filter trends based on subscription, search, and advanced filters
  const allTrends = getTrendsByCategory(selectedCategory)
    .filter(trend => {
      // Platform filtering based on subscription
      if (!canAccessPlatform(trend.platform.toLowerCase())) {
        return false;
      }
      
      // App filtering
      if (selectedPlatforms.includes('all') || selectedPlatforms.includes(trend.platform.toLowerCase())) {
        // Search filtering
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            trend.title.toLowerCase().includes(query) ||
            trend.description.toLowerCase().includes(query) ||
            trend.category.toLowerCase().includes(query) ||
            trend.platform.toLowerCase().includes(query) ||
            trend.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        return true;
      }
      
      return selectedPlatforms.includes(trend.platform.toLowerCase());
    });

  // Apply advanced filters
  const filteredTrends = applyFilters(allTrends, activeFilters);

  // Limit trends for free users
  const trends = currentTier === 'free' 
    ? filteredTrends.slice(0, 2) 
    : filteredTrends;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Switch to trends view when searching
    if (query && currentView !== 'trends') {
      setCurrentView('trends');
    }
  };

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    
    // Track filter usage
    if (window.gtag) {
      window.gtag('event', 'advanced_filters_applied', {
        event_category: 'engagement',
        event_label: 'filter_usage',
        custom_parameters: {
          viral_score_min: filters.viralScore.min,
          viral_score_max: filters.viralScore.max,
          time_range: filters.timeRange,
          categories_count: filters.categories.length,
          platforms_count: filters.platforms.length
        }
      });
    }
  };

  const handleClearFilters = () => {
    setActiveFilters(null);
  };

  const handleExplainTrend = (trend: Trend) => {
    setShowChat(true);
  };

  const handleCreateNiche = () => {
    if (currentTier === 'free') {
      setPremiumFeature('niches');
      setShowPremiumModal(true);
      return;
    }
    setShowCreateNiche(true);
  };

  const handleNavigate = (view: DashboardView) => {
    // Check premium features
    if (view === 'analytics' && !hasFeature('hasAnalytics')) {
      setPremiumFeature('analytics');
      setShowPremiumModal(true);
      return;
    }
    
    if (view === 'scriptwriter' && !hasFeature('hasScriptWriter')) {
      setPremiumFeature('scriptwriter');
      setShowPremiumModal(true);
      return;
    }
    
    if (view === 'research' && !hasFeature('hasDeepResearch')) {
      setPremiumFeature('research');
      setShowPremiumModal(true);
      return;
    }
    
    setCurrentView(view);
  };

  const handleSaveNiche = (nicheData: any) => {
    console.log('Saving niche:', nicheData);
  };

  const handlePlatformChange = (platforms: string[]) => {
    // Filter out premium platforms for free users
    if (currentTier === 'free') {
      const allowedPlatforms = platforms.filter(platform => 
        platform === 'all' || canAccessPlatform(platform)
      );
      
      if (allowedPlatforms.length === 0) {
        setPremiumFeature('platforms');
        setShowPremiumModal(true);
        return;
      }
      
      setSelectedPlatforms(allowedPlatforms);
    } else {
      setSelectedPlatforms(platforms);
    }
  };

  const handleUpgradeClick = (feature?: keyof SubscriptionFeatures | 'general') => {
    setPremiumFeature(feature || 'general');
    setShowPremiumModal(true);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'trends':
        return (
          <TrendFeed 
            trends={trends} 
            onExplainTrend={handleExplainTrend} 
            searchQuery={searchQuery}
            totalAvailable={allTrends.length}
            activeFilters={activeFilters}
            onClearFilters={handleClearFilters}
            onUpgradeClick={() => handleUpgradeClick('general')}
          />
        );
      case 'niches':
        return <NicheMonitor onCreateNiche={handleCreateNiche} />;
      case 'research':
        return <DeepResearch />;
      case 'scriptwriter':
        return <ScriptWriter />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <TrendFeed 
            trends={trends} 
            onExplainTrend={handleExplainTrend} 
            searchQuery={searchQuery}
            totalAvailable={allTrends.length}
            activeFilters={activeFilters}
            onClearFilters={handleClearFilters}
            onUpgradeClick={() => handleUpgradeClick('general')}
          />
        );
    }
  };

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-black">
        <Header 
          onCreateNiche={handleCreateNiche}
          onNavigate={handleNavigate}
          onSearch={handleSearch}
        />
        
        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 bg-black border-r border-gray-800 h-[calc(100vh-64px)] overflow-y-auto sidebar-scroll">
            <Sidebar 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory}
              selectedPlatforms={selectedPlatforms}
              onPlatformChange={handlePlatformChange}
              selectedApps={selectedApps}
              onAppChange={setSelectedApps}
              currentView={currentView}
              onViewChange={handleNavigate}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onApplyFilters={handleApplyFilters}
              activeFilters={activeFilters}
              subscription={{
                currentTier,
                canAccessPlatform,
                hasFeature,
                onUpgradeClick: handleUpgradeClick
              }}
            />
          </div>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto h-[calc(100vh-64px)] bg-black feed-scroll">
            <div className="max-w-6xl mx-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className={`${showChat ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                  {renderMainContent()}
                </div>
                
                {showChat && (
                  <div className="lg:col-span-1">
                    <div className="sticky top-6">
                      <ChatInterface onClose={() => setShowChat(false)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Create Niche Modal */}
        {showCreateNiche && (
          <CreateNichePage
            onClose={() => setShowCreateNiche(false)}
            onSave={handleSaveNiche}
          />
        )}

        {/* Premium Modal */}
        <PremiumModal
          isOpen={showPremiumModal}
          onClose={() => setShowPremiumModal(false)}
          onUpgrade={upgradeTier}
          feature={premiumFeature}
          currentTier={currentTier}
        />
      </div>
    </>
  );
}

export default DashboardPage;
