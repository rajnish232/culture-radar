export interface Trend {
  id: string;
  title: string;
  category: string;
  platform: string;
  engagement: string;
  timeAgo: string;
  description: string;
  explanation?: string;
  viralScore: number;
  tags: string[];
}

export const mockTrends: Trend[] = [
  {
    id: '1',
    title: 'The "It\'s Giving" Meme Evolution Takes Over Gen Z',
    category: 'Memes',
    platform: 'TikTok',
    engagement: '2.3M views',
    timeAgo: '15 mins ago',
    description: 'The phrase "it\'s giving" has evolved from simple slang to a complex meme format where users describe situations with increasingly specific and humorous "vibes."',
    explanation: 'This meme originated from AAVE and has been adapted by Gen Z to describe situations, outfits, or vibes. The humor comes from the increasingly specific and absurd descriptions like "it\'s giving unemployed Disney princess" or "it\'s giving main character energy."',
    viralScore: 94,
    tags: ['genz', 'slang', 'tiktok', 'viral']
  },
  {
    id: '2',
    title: 'New AI Model "GPT-5" Rumors Spark Tech Community Frenzy',
    category: 'Tech',
    platform: 'Twitter',
    engagement: '890K interactions',
    timeAgo: '32 mins ago',
    description: 'Unverified leaks about GPT-5 capabilities are causing massive speculation across tech Twitter, with developers and researchers debating potential implications.',
    explanation: 'The tech community is buzzing because leaked specifications suggest significant improvements in reasoning and multimodal capabilities. This represents a potential paradigm shift in AI development.',
    viralScore: 87,
    tags: ['AI', 'OpenAI', 'GPT5', 'tech', 'speculation']
  },
  {
    id: '3',
    title: 'Celebrity Feud Explodes: Social Media War Unfolds Live',
    category: 'Drama',
    platform: 'Instagram',
    engagement: '5.7M likes',
    timeAgo: '1 hour ago',
    description: 'Two A-list celebrities are trading barbs on social media in real-time, with fans taking sides and creating memes from their exchanges.',
    explanation: 'This drama started over a misunderstood comment but has escalated into a full social media war. The entertainment value comes from the passive-aggressive posts and fan reactions.',
    viralScore: 92,
    tags: ['celebrity', 'drama', 'feud', 'entertainment']
  },
  {
    id: '4',
    title: 'Crypto Whale Movement Triggers Market Speculation',
    category: 'Crypto',
    platform: 'Reddit',
    engagement: '45K upvotes',
    timeAgo: '45 mins ago',
    description: 'A mysterious wallet moved $500M in Bitcoin, causing widespread speculation about institutional adoption or potential market manipulation.',
    explanation: 'Large cryptocurrency movements often signal significant market events. The crypto community analyzes these "whale" movements to predict price directions and institutional involvement.',
    viralScore: 76,
    tags: ['bitcoin', 'whale', 'crypto', 'market', 'speculation']
  },
  {
    id: '5',
    title: 'Viral Dance Challenge Takes Over NFL Players',
    category: 'Sports',
    platform: 'TikTok',
    engagement: '3.1M views',
    timeAgo: '2 hours ago',
    description: 'Professional NFL players are participating in the latest TikTok dance challenge during warm-ups, creating a crossover between sports and social media culture.',
    explanation: 'This represents the growing influence of social media culture in professional sports. Athletes are using viral trends to connect with younger audiences and build their personal brands.',
    viralScore: 81,
    tags: ['NFL', 'dance', 'challenge', 'sports', 'crossover']
  },
  {
    id: '6',
    title: 'Underground Music Producer Goes Viral Overnight',
    category: 'Music',
    platform: 'YouTube',
    engagement: '1.8M plays',
    timeAgo: '3 hours ago',
    description: 'An unknown bedroom producer\'s track was featured in a viral video, leading to millions of streams and record label interest within 24 hours.',
    explanation: 'This is a perfect example of how viral content can instantly change someone\'s life. The track\'s unique sound caught the attention of content creators, leading to organic viral growth.',
    viralScore: 85,
    tags: ['music', 'producer', 'viral', 'overnight', 'success']
  }
];

export const getTrendsByCategory = (category: string): Trend[] => {
  if (category === 'all') return mockTrends;
  return mockTrends.filter(trend => trend.category.toLowerCase() === category);
};
