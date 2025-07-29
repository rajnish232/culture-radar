import { useState, useEffect } from 'react';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface SubscriptionFeatures {
  maxTrends: number;
  maxNichePages: number;
  platforms: string[];
  hasAnalytics: boolean;
  hasAdvancedFilters: boolean;
  hasScriptWriter: boolean;
  hasDeepResearch: boolean;
  hasExportFeatures: boolean;
  hasPrioritySupport: boolean;
  hasCustomIntegrations: boolean;
  hasTeamCollaboration: boolean;
  maxTeamMembers: number;
}

const SUBSCRIPTION_FEATURES: Record<SubscriptionTier, SubscriptionFeatures> = {
  free: {
    maxTrends: 2,
    maxNichePages: 1,
    platforms: ['reddit'],
    hasAnalytics: false,
    hasAdvancedFilters: false,
    hasScriptWriter: false,
    hasDeepResearch: false,
    hasExportFeatures: false,
    hasPrioritySupport: false,
    hasCustomIntegrations: false,
    hasTeamCollaboration: false,
    maxTeamMembers: 1
  },
  pro: {
    maxTrends: -1, // unlimited
    maxNichePages: -1, // unlimited
    platforms: ['reddit', 'twitter', 'tiktok', 'instagram', 'youtube'],
    hasAnalytics: true,
    hasAdvancedFilters: true,
    hasScriptWriter: true,
    hasDeepResearch: true,
    hasExportFeatures: true,
    hasPrioritySupport: true,
    hasCustomIntegrations: true,
    hasTeamCollaboration: false,
    maxTeamMembers: 1
  },
  enterprise: {
    maxTrends: -1, // unlimited
    maxNichePages: -1, // unlimited
    platforms: ['reddit', 'twitter', 'tiktok', 'instagram', 'youtube'],
    hasAnalytics: true,
    hasAdvancedFilters: true,
    hasScriptWriter: true,
    hasDeepResearch: true,
    hasExportFeatures: true,
    hasPrioritySupport: true,
    hasCustomIntegrations: true,
    hasTeamCollaboration: true,
    maxTeamMembers: 10
  }
};

export function useSubscription() {
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free');
  const [features, setFeatures] = useState<SubscriptionFeatures>(SUBSCRIPTION_FEATURES.free);

  useEffect(() => {
    setFeatures(SUBSCRIPTION_FEATURES[currentTier]);
  }, [currentTier]);

  const hasFeature = (feature: keyof SubscriptionFeatures): boolean => {
    return Boolean(features[feature]);
  };

  const canAccessPlatform = (platform: string): boolean => {
    return features.platforms.includes(platform.toLowerCase()) || features.platforms.includes('all');
  };

  const canCreateMoreNiches = (currentCount: number): boolean => {
    return features.maxNichePages === -1 || currentCount < features.maxNichePages;
  };

  const canViewMoreTrends = (currentCount: number): boolean => {
    return features.maxTrends === -1 || currentCount < features.maxTrends;
  };

  const upgradeTier = (newTier: SubscriptionTier) => {
    setCurrentTier(newTier);
  };

  return {
    currentTier,
    features,
    hasFeature,
    canAccessPlatform,
    canCreateMoreNiches,
    canViewMoreTrends,
    upgradeTier,
    SUBSCRIPTION_FEATURES
  };
}
