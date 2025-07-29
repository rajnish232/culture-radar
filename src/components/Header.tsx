import { useState } from 'react';
import { Radar, Bell, Settings, Search } from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { MessageSquare } from 'lucide-react'; // Import the chat icon

interface HeaderProps {
  onCreateNiche: () => void;
  onNavigate: (view: 'trends' | 'niches' | 'research' | 'scriptwriter' | 'analytics' | 'settings') => void;
  onSearch: (query: string) => void;
}

export function Header({ onCreateNiche, onNavigate, onSearch }: HeaderProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'New viral trend detected',
      message: 'AI Tool Launch is trending across multiple platforms',
      time: '2 mins ago',
      type: 'trend',
      unread: true
    },
    {
      id: '2',
      title: 'Niche update available',
      message: 'Movie Industry Intel has 3 new updates',
      time: '15 mins ago',
      type: 'niche',
      unread: true
    },
    {
      id: '3',
      title: 'Weekly digest ready',
      message: 'Your cultural trends summary is ready',
      time: '1 hour ago',
      type: 'digest',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Radar className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CultureScope
                  </h1>
                  <p className="text-xs text-gray-400 tracking-wider uppercase">Your Cultural Co-Pilot</p>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search trends, memes, viral content..."
                  className="w-full pl-12 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-400 text-lg"
                  onChange={(e) => onSearch(e.target.value)}
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Navigation Buttons */}
              <button
                onClick={() => onNavigate('trends')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Trends
              </button>
              <button
                onClick={() => onNavigate('niches')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Niches
              </button>
              <button
                onClick={() => onNavigate('research')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Research
              </button>
              <button
                onClick={() => onNavigate('scriptwriter')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Script Writer
              </button>
              <button
                onClick={() => onNavigate('analytics')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Analytics
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Settings
              </button>
              <button
                onClick={onCreateNiche}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                Create Niche
              </button>
              {/* Chat Toggle Button - keeping it for now, but it's not used in DashboardPage */}
              {/* <button
                onClick={onToggleChat}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                <MessageSquare className="w-6 h-6" />
              </button> */}

              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/25">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-4 w-96 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 z-50">
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-lg">Notifications</h3>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-6 border-b border-white/5 hover:bg-white/5 transition-colors ${
                            notification.unread ? 'bg-blue-500/5 border-l-4 border-l-blue-500' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`w-3 h-3 rounded-full mt-2 ${
                              notification.unread ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-600'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white">{notification.title}</p>
                              <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 border-t border-white/10">
                      <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium bg-blue-500/10 py-3 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setShowProfileModal(true)}
                className="p-3 text-gray-400 hover:text-white transition-colors bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20"
              >
                <Settings className="w-6 h-6" />
              </button>

              <button 
                onClick={() => setShowProfileModal(true)}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
              ></button>
            </div>
          </div>
        </div>
      </header>

      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </>
  );
}
