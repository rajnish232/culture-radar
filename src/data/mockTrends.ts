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
  // Reddit trends (available for free users)
  {
    id: '1',
    title: 'Reddit Community Discovers Ancient Internet Meme',
    category: 'Memes',
    platform: 'Reddit',
    engagement: '45K upvotes',
    timeAgo: '2 hours ago',
    description: 'A forgotten meme from 2008 resurfaces on r/nostalgia and is gaining massive traction across multiple subreddits.',
    explanation: 'Our AI detected early engagement patterns in niche subreddits 4 hours before this went viral. The nostalgia factor combined with Gen Z discovering "new" content creates perfect viral conditions. Prediction confidence: 87%',
    viralScore: 87,
    tags: ['reddit', 'nostalgia', 'meme', 'viral', 'community']
  },
  {
    id: '2',
    title: 'Crypto Whale Movement Triggers Market Speculation',
    category: 'Crypto',
    platform: 'Reddit',
    engagement: '78K upvotes',
    timeAgo: '45 mins ago',
    description: 'A mysterious wallet moved $500M in Bitcoin, causing widespread speculation about institutional adoption on r/cryptocurrency.',
    explanation: 'Our blockchain analysis detected unusual wallet activity patterns 3 hours before public discovery. Large cryptocurrency movements often signal significant market events. Early warning system triggered at 92% confidence.',
    viralScore: 92,
    tags: ['bitcoin', 'whale', 'crypto', 'market', 'speculation']
  },
  
  // Premium platform trends (Twitter, TikTok, Instagram, YouTube)
  {
    id: '3',
    title: 'The "It\'s Giving" Meme Evolution Takes Over Gen Z',
    category: 'Memes',
    platform: 'TikTok',
    engagement: '2.3M views',
    timeAgo: '15 mins ago',
    description: 'The phrase "it\'s giving" has evolved from simple slang to a complex meme format where users describe situations with increasingly specific and humorous "vibes."',
    explanation: 'Our AI detected early engagement patterns 6 hours before this went viral. The meme originated from AAVE and has been adapted by Gen Z to describe situations, outfits, or vibes. Prediction confidence: 94%',
    viralScore: 94,
    tags: ['genz', 'slang', 'tiktok', 'viral', 'pre-detected']
  },
  {
    id: '4',
    title: 'New AI Model "GPT-5" Rumors Spark Tech Community Frenzy',
    category: 'Tech',
    platform: 'Twitter',
    engagement: '890K interactions',
    timeAgo: '32 mins ago',
    description: 'Unverified leaks about GPT-5 capabilities are causing massive speculation across tech Twitter, with developers and researchers debating potential implications.',
    explanation: 'Our prediction engine spotted unusual activity patterns in tech communities 4 hours before mainstream coverage. Early detection accuracy: 87%',
    viralScore: 87,
    tags: ['AI', 'OpenAI', 'GPT5', 'tech', 'speculation']
  },
  {
    id: '5',
    title: 'Celebrity Feud Explodes: Social Media War Unfolds Live',
    category: 'Drama',
    platform: 'Instagram',
    engagement: '5.7M likes',
    timeAgo: '1 hour ago',
    description: 'Two A-list celebrities are trading barbs on social media in real-time, with fans taking sides and creating memes from their exchanges.',
    explanation: 'AI detected tension building through subtle social media interactions 8 hours before the public feud erupted. Prediction accuracy: 92%',
    viralScore: 92,
    tags: ['celebrity', 'drama', 'feud', 'entertainment', 'predicted']
  },
  {
    id: '6',
    title: 'Viral Dance Challenge Takes Over NFL Players',
    category: 'Sports',
    platform: 'TikTok',
    engagement: '3.1M views',
    timeAgo: '2 hours ago',
    description: 'Professional NFL players are participating in the latest TikTok dance challenge during warm-ups, creating a crossover between sports and social media culture.',
    explanation: 'AI spotted early adoption patterns among sports influencers 5 hours before mainstream athlete participation. Crossover prediction: 81%',
    viralScore: 81,
    tags: ['NFL', 'dance', 'challenge', 'sports', 'crossover']
  },
  {
    id: '7',
    title: 'Underground Music Producer Goes Viral Overnight',
    category: 'Music',
    platform: 'YouTube',
    engagement: '1.8M plays',
    timeAgo: '3 hours ago',
    description: 'An unknown bedroom producer\'s track was featured in a viral video, leading to millions of streams and record label interest within 24 hours.',
    explanation: 'Our music trend algorithm identified unique sound patterns and early engagement spikes 7 hours before viral breakthrough. Discovery confidence: 85%',
    viralScore: 85,
    tags: ['music', 'producer', 'viral', 'overnight', 'success']
  },
  {
    id: '8',
    title: 'Gaming Streamer\'s Reaction Becomes Instant Meme Template',
    category: 'Memes',
    platform: 'TikTok',
    engagement: '2.8M clips',
    timeAgo: '4 hours ago',
    description: 'A popular streamer\'s exaggerated reaction to a game glitch has been clipped and turned into a versatile meme template across platforms.',
    explanation: 'Pre-viral detection system identified clip potential through facial expression analysis 2 hours before meme explosion. Meme template prediction: 89%',
    viralScore: 89,
    tags: ['gaming', 'streamer', 'meme', 'template', 'reaction']
  },
  {
    id: '9',
    title: 'Fashion Brand\'s Accidental Tweet Sparks Viral Marketing Debate',
    category: 'Drama',
    platform: 'Twitter',
    engagement: '1.2M retweets',
    timeAgo: '5 hours ago',
    description: 'A major fashion brand accidentally posted an internal message, leading to discussions about authentic vs. calculated social media presence.',
    explanation: 'Social listening algorithms detected unusual engagement patterns around brand authenticity 3 hours before mainstream discussion. Controversy prediction: 73%',
    viralScore: 73,
    tags: ['fashion', 'brand', 'marketing', 'authenticity', 'controversy']
  },
  {
    id: '10',
    title: 'Food Trend: "Butter Boards" Making Unexpected Comeback',
    category: 'Food',
    platform: 'Instagram',
    engagement: '950K saves',
    timeAgo: '6 hours ago',
    description: 'The butter board trend from 2022 is experiencing a surprising resurgence with new creative variations and seasonal adaptations.',
    explanation: 'Trend cycle analysis predicted this comeback based on seasonal patterns and influencer activity 12 hours before resurgence. Comeback prediction: 68%',
    viralScore: 68,
    tags: ['food', 'trend', 'comeback', 'butter-boards', 'seasonal']
  }
];

export const getTrendsByCategory = (category: string): Trend[] => {
  if (category === 'all') return mockTrends;
  return mockTrends.filter(trend => trend.category.toLowerCase() === category);
};
