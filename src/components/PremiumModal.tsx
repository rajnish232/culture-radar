import React from 'react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (tier: 'pro' | 'enterprise') => void;
  feature: string;
  currentTier: 'free' | 'pro' | 'enterprise';
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onUpgrade, feature, currentTier }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-white border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">Upgrade to Premium</h2>
        <p className="text-center mb-6">
          Unlock the <strong>{feature}</strong> feature and much more with a premium subscription!
        </p>
        <div className="space-y-4">
          <button
            onClick={() => onUpgrade('pro')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Upgrade to Pro
          </button>
          <button
            onClick={() => onUpgrade('enterprise')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Upgrade to Enterprise
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            No Thanks
          </button>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          Your current tier: <span className="capitalize">{currentTier}</span>
        </p>
      </div>
    </div>
  );
};
