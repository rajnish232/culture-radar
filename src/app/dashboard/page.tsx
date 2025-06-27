'use client';

import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import TrendFeed from '../../components/TrendFeed';
import { ChatInterface } from '../../components/ChatInterface';
import { NicheMonitor } from '../../components/NicheMonitor';
import { CreateNichePage } from '../../components/CreateNichePage';
import { mockNichePages } from '../../data/mockNiches';
// @ts-ignore
import { NichePage } from '../../types';
import AlertsPreferences from '../../components/AlertsPreferences';
import { Header } from '../../components/Header';

function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showChat, setShowChat] = useState(false);
  const [currentView, setCurrentView] = useState<'trends' | 'niches'>('trends');
  const [showCreateNiche, setShowCreateNiche] = useState(false);

  // Function to toggle chat visibility
  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  const handleCreateNiche = () => {
    setShowCreateNiche(true);
  };

  const handleSaveNiche = (nicheData: any) => {
    // In a real app, this would save to backend
    console.log('Saving niche:', nicheData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header onToggleChat={toggleChat} />
      
      <div className="flex relative z-10">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <main className="flex-1 min-h-screen">
          <div className="max-w-6xl mx-auto p-6">
            <AlertsPreferences />

            {/* Removed redundant "Cultural Radar Dashboard" title and description */}
            {/* Removed redundant search bar and AI Co-Pilot button */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className={`${showChat ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                {currentView === 'trends' ? (
                  <TrendFeed />
                ) : (
                  <NicheMonitor niches={mockNichePages} onCreateNiche={handleCreateNiche} />
                )}
              </div>
              
              {showChat && (
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <ChatInterface />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Premium Floating Stats Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Live</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Status</div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {currentView === 'trends' ? 'Live' : '2'}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">
                {currentView === 'trends' ? 'Trends' : 'Niches'}
              </div>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-400 text-xs uppercase tracking-wider">Monitor</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Niche Modal */}
      {showCreateNiche && (
        <CreateNichePage
          onClose={() => setShowCreateNiche(false)}
          onSave={handleSaveNiche}
        />
      )}
    </div>
  );
}

export default DashboardPage;
