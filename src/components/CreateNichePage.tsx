import React, { useState } from 'react';
import { X, Plus, Search, Check, AlertCircle } from 'lucide-react';
import { NicheSource } from '../types';
import { mockNicheSources } from '../data/mockNiches';

interface CreateNichePageProps {
  onClose: () => void;
  onSave: (nicheData: any) => void;
}

export function CreateNichePage({ onClose, onSave }: CreateNichePageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    keywords: [] as string[],
    sources: [] as NicheSource[],
    isPublic: true,
    color: 'from-blue-500 to-purple-500'
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [sourceSearch, setSourceSearch] = useState('');
  const [customSource, setCustomSource] = useState({
    name: '',
    platform: 'Twitter',
    handle: ''
  });

  const colorOptions = [
    'from-blue-500 to-purple-500',
    'from-red-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-purple-500 to-indigo-500',
    'from-yellow-500 to-orange-500'
  ];

  const platformOptions = ['Twitter', 'Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'Reddit'];

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const addSource = (source: NicheSource) => {
    if (!formData.sources.find(s => s.id === source.id)) {
      setFormData(prev => ({
        ...prev,
        sources: [...prev.sources, source]
      }));
    }
  };

  const removeSource = (sourceId: string) => {
    setFormData(prev => ({
      ...prev,
      sources: prev.sources.filter(s => s.id !== sourceId)
    }));
  };

  const addCustomSource = () => {
    if (customSource.name && customSource.handle) {
      const newSource: NicheSource = {
        id: Date.now().toString(),
        name: customSource.name,
        platform: customSource.platform,
        handle: customSource.handle,
        category: 'Custom',
        isActive: true,
        lastUpdate: 'Just added'
      };
      addSource(newSource);
      setCustomSource({ name: '', platform: 'Twitter', handle: '' });
    }
  };

  const filteredSources = mockNicheSources.filter((source: NicheSource) =>
    source.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
    source.handle.toLowerCase().includes(sourceSearch.toLowerCase())
  );

  const handleSave = () => {
    if (formData.name && formData.description && formData.sources.length > 0) {
      onSave({
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Niche Page</h2>
            <p className="text-gray-600 text-sm">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Movie Industry Intel, AI Tech Radar"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this niche page will monitor and track"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Business">Business</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Color
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      onClick={() => setFormData(prev => ({ ...prev, color }))}
                      className={`h-12 rounded-lg bg-gradient-to-r ${color} relative ${
                        formData.color === color ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                      }`}
                    >
                      {formData.color === color && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  Make this page public (others can discover and follow it)
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords & Topics
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Add keywords that will help filter relevant content from your sources
                </p>
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    placeholder="Enter a keyword or topic"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map(keyword => (
                    <span
                      key={keyword}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>#{keyword}</span>
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Sources to Monitor *
                </label>
                <p className="text-sm text-gray-500 mb-4">
                  Select existing sources or add custom ones to track
                </p>

                <div className="mb-6">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={sourceSearch}
                      onChange={(e) => setSourceSearch(e.target.value)}
                      placeholder="Search existing sources..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {filteredSources.map(source => (
                      <div
                        key={source.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.sources.find(s => s.id === source.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => addSource(source)}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={source.avatar}
                            alt={source.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{source.name}</p>
                            <p className="text-xs text-gray-500">{source.handle} • {source.platform}</p>
                          </div>
                          {formData.sources.find(s => s.id === source.id) && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Add Custom Source</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={customSource.name}
                      onChange={(e) => setCustomSource(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Source name"
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={customSource.platform}
                      onChange={(e) => setCustomSource(prev => ({ ...prev, platform: e.target.value }))}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {platformOptions.map(platform => (
                        <option key={platform} value={platform}>{platform}</option>
                      ))}
                    </select>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customSource.handle}
                        onChange={(e) => setCustomSource(prev => ({ ...prev, handle: e.target.value }))}
                        placeholder="@handle"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={addCustomSource}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {formData.sources.length > 0 && (
                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Selected Sources ({formData.sources.length})</h4>
                    <div className="space-y-2">
                      {formData.sources.map(source => (
                        <div key={source.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <img
                              src={source.avatar || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                              alt={source.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{source.name}</p>
                              <p className="text-xs text-gray-500">{source.handle} • {source.platform}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeSource(source.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.sources.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <p>Please add at least one source to monitor</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex space-x-2">
            {[1, 2, 3].map(stepNum => (
              <div
                key={stepNum}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum === step
                    ? 'bg-blue-600 text-white'
                    : stepNum < step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum < step ? <Check className="w-4 h-4" /> : stepNum}
              </div>
            ))}
          </div>

          <div className="flex space-x-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && (!formData.name || !formData.description)) ||
                  (step === 3 && formData.sources.length === 0)
                }
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={formData.sources.length === 0}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Niche Page
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
