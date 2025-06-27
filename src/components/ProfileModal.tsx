import React, { useState } from 'react';
import { X, User, Bell, Shield, CreditCard, Settings, Check, Crown, Zap } from 'lucide-react';
import PersonalitySelector from './PersonalitySelector';
import EmailSettings from './EmailSettings';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    username: '@alexj_creator',
    bio: 'Content creator focused on tech trends and viral culture',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    location: 'San Francisco, CA',
    website: 'alexjohnson.com'
  });

  const [notifications, setNotifications] = useState({
    trendAlerts: true,
    nicheUpdates: true,
    viralAlerts: true,
    weeklyDigest: false,
    emailNotifications: true,
    pushNotifications: true
  });

  // Dummy usage to satisfy linter
  console.log(setNotifications);

  const [currentPlan, setCurrentPlan] = useState('free');

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic trend monitoring',
        '2 custom niche pages',
        'Daily culture digest',
        'Community access'
      ],
      color: 'border-white/20',
      buttonColor: 'bg-white/10 text-gray-300 hover:bg-white/20',
      icon: User
    },
    {
      id: 'pro',
      name: 'Pro Creator',
      price: '$19',
      period: 'month',
      features: [
        'Advanced trend analytics',
        'Unlimited niche pages',
        'Real-time viral alerts',
        'AI trend predictions',
        'Export capabilities',
        'Priority support'
      ],
      color: 'border-blue-500',
      buttonColor: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600',
      icon: Zap,
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: 'month',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Custom integrations',
        'Dedicated account manager',
        'Advanced API access',
        'White-label options'
      ],
      color: 'border-purple-500',
      buttonColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600',
      icon: Crown
    }
  ];

  if (!isOpen) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-8 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/10 rounded-2xl transition-colors border border-white/10"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-80 bg-black/20 border-r border-white/10">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20"
                />
                <div>
                  <p className="font-bold text-white text-lg">{profileData.name}</p>
                  <p className="text-sm text-gray-400">{profileData.username}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-8">
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Profile Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Username
                        </label>
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Website
                        </label>
                        <input
                          type="url"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all font-semibold shadow-lg">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <input
                            type="checkbox"
                            id={key}
                            checked={value}
                            onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <label htmlFor={key} className="ml-3 text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'subscription' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Subscription Plans</h3>
                    <p className="text-gray-300 mb-8 text-lg">Choose the plan that best fits your content creation needs</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {subscriptionPlans.map(plan => {
                        const Icon = plan.icon;
                        return (
                          <div
                            key={plan.id}
                            className={`relative p-8 border-2 rounded-3xl ${plan.color} ${
                              currentPlan === plan.id ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900' : ''
                            } bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all`}
                          >
                            {plan.popular && (
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                  Most Popular
                                </span>
                              </div>
                            )}
                            
                            <div className="text-center mb-8">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Icon className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-2xl font-bold text-white">{plan.name}</h4>
                              <div className="mt-3">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                <span className="text-gray-400 text-lg">/{plan.period}</span>
                              </div>
                            </div>
                            
                            <ul className="space-y-4 mb-8">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                                    <Check className="w-4 h-4 text-green-400" />
                                  </div>
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <button
                              onClick={() => setCurrentPlan(plan.id)}
                              className={`w-full py-4 px-6 rounded-2xl font-bold transition-all ${
                                currentPlan === plan.id
                                  ? 'bg-green-500/20 text-green-300 cursor-default border border-green-500/30'
                                  : plan.buttonColor
                              }`}
                              disabled={currentPlan === plan.id}
                            >
                              {currentPlan === plan.id ? 'Current Plan' : 'Select Plan'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6">App Settings</h3>
                    <PersonalitySelector />
                    <EmailSettings />
                  </div>
                </div>
              )}

              {/* Other tabs would be implemented similarly with the dark theme */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
