import { NichePage, NicheSource, NicheUpdate } from '../types';

export const mockNicheSources: NicheSource[] = [
  {
    id: '1',
    name: 'Marvel Studios',
    platform: 'Twitter',
    handle: '@MarvelStudios',
    avatar: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Movies',
    isActive: true,
    lastUpdate: '2 hours ago',
    followerCount: '15.2M'
  },
  {
    id: '2',
    name: 'A24 Films',
    platform: 'Instagram',
    handle: '@a24',
    avatar: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Movies',
    isActive: true,
    lastUpdate: '5 hours ago',
    followerCount: '3.8M'
  },
  {
    id: '3',
    name: 'Variety',
    platform: 'Twitter',
    handle: '@Variety',
    avatar: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Entertainment News',
    isActive: true,
    lastUpdate: '1 hour ago',
    followerCount: '2.1M'
  },
  {
    id: '4',
    name: 'OpenAI',
    platform: 'Twitter',
    handle: '@OpenAI',
    avatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'AI/Tech',
    isActive: true,
    lastUpdate: '30 mins ago',
    followerCount: '4.2M'
  },
  {
    id: '5',
    name: 'TechCrunch',
    platform: 'Twitter',
    handle: '@TechCrunch',
    avatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    category: 'Tech News',
    isActive: true,
    lastUpdate: '45 mins ago',
    followerCount: '9.8M'
  }
];

export const mockNichePages: NichePage[] = [
  {
    id: '1',
    name: 'Movie Industry Intel',
    description: 'Track major studios, indie films, and entertainment news for movie reviews and analysis',
    category: 'Entertainment',
    sources: mockNicheSources.filter(s => s.category.includes('Movies') || s.category.includes('Entertainment')),
    keywords: ['movie', 'film', 'trailer', 'release', 'box office', 'casting'],
    createdAt: '2024-01-15',
    isPublic: true,
    color: 'from-red-500 to-pink-500'
  },
  {
    id: '2',
    name: 'AI & Tech Radar',
    description: 'Monitor AI companies, tech launches, and industry developments',
    category: 'Technology',
    sources: mockNicheSources.filter(s => s.category.includes('AI') || s.category.includes('Tech')),
    keywords: ['AI', 'machine learning', 'startup', 'funding', 'product launch', 'tech'],
    createdAt: '2024-01-20',
    isPublic: false,
    color: 'from-blue-500 to-purple-500'
  }
];

export const mockNicheUpdates: NicheUpdate[] = [
  {
    id: '1',
    sourceId: '1',
    sourceName: 'Marvel Studios',
    platform: 'Twitter',
    title: 'Deadpool & Wolverine breaks opening weekend records',
    content: '🔥 BREAKING: Deadpool & Wolverine just shattered box office records with a $205M opening weekend! The multiverse is officially back in business. What did you think of the movie? #DeadpoolAndWolverine',
    timestamp: '2 hours ago',
    engagement: '2.3M likes',
    link: 'https://twitter.com/marvelstudios/status/123',
    mediaType: 'text',
    tags: ['box office', 'record', 'deadpool', 'wolverine', 'multiverse']
  },
  {
    id: '2',
    sourceId: '2',
    sourceName: 'A24 Films',
    platform: 'Instagram',
    title: 'New horror film "The Substance" gets Cannes premiere',
    content: 'Our latest psychological horror "The Substance" starring Demi Moore premieres at Cannes Film Festival. Prepare for body horror like you\'ve never seen before.',
    timestamp: '5 hours ago',
    engagement: '890K likes',
    link: 'https://instagram.com/a24/post/456',
    mediaType: 'image',
    tags: ['cannes', 'horror', 'demi moore', 'premiere', 'festival']
  },
  {
    id: '3',
    sourceId: '4',
    sourceName: 'OpenAI',
    platform: 'Twitter',
    title: 'GPT-4o with advanced reasoning now available',
    content: 'Introducing enhanced reasoning capabilities in GPT-4o. Better at math, coding, and complex problem-solving. Rolling out to Plus subscribers first.',
    timestamp: '30 mins ago',
    engagement: '1.8M likes',
    link: 'https://twitter.com/openai/status/789',
    mediaType: 'text',
    tags: ['GPT-4o', 'reasoning', 'AI', 'update', 'plus']
  },
  {
    id: '4',
    sourceId: '5',
    sourceName: 'TechCrunch',
    platform: 'Twitter',
    title: 'Startup funding drops 35% in Q3 2024',
    content: 'New report shows venture funding continues to decline as investors become more selective. AI startups still attracting majority of investment despite overall downturn.',
    timestamp: '45 mins ago',
    engagement: '456K likes',
    link: 'https://twitter.com/techcrunch/status/101',
    mediaType: 'link',
    tags: ['funding', 'startup', 'venture capital', 'AI', 'investment']
  }
];

export const getNicheUpdatesByPageId = (pageId: string): NicheUpdate[] => {
  const page = mockNichePages.find(p => p.id === pageId);
  if (!page) return [];
  
  const sourceIds = page.sources.map(s => s.id);
  return mockNicheUpdates.filter(update => sourceIds.includes(update.sourceId));
};
