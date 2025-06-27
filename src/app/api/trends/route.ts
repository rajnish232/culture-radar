import { NextResponse } from 'next/server';
import { Trend } from '../../../types';

// Mock trending topics for MVP
const mockTrends: Trend[] = [
  {
    id: 'reddit-1',
    title: 'AI Cat Paintings Go Viral',
    category: 'Technology',
    platform: 'Reddit',
    engagement: '12.5K upvotes',
    timeAgo: '2 hours ago',
    description: 'A Reddit post featuring AI-generated cat paintings is trending across multiple subreddits.',
    viralScore: 85,
    tags: ['AI', 'Art', 'Cats']
  },
  {
    id: 'twitter-1',
    title: 'Celebrity AI Voice Memes',
    category: 'Entertainment',
    platform: 'Twitter',
    engagement: '8.3K retweets',
    timeAgo: '3 hours ago',
    description: 'Twitter users are sharing memes using AI-generated celebrity voices.',
    viralScore: 78,
    tags: ['AI', 'Memes', 'Celebrities']
  },
  {
    id: 'tiktok-1',
    title: 'AI Dance Challenge',
    category: 'Lifestyle',
    platform: 'TikTok',
    engagement: '15.7K videos',
    timeAgo: '1 day ago',
    description: 'A new dance challenge created by AI is gaining traction on TikTok.',
    viralScore: 92,
    tags: ['AI', 'Dance', 'Challenge']
  },
  {
    id: 'youtube-1',
    title: 'AI-Generated Music Videos',
    category: 'Music',
    platform: 'YouTube',
    engagement: '3.2M views',
    timeAgo: '5 hours ago',
    description: 'AI-generated music videos are becoming a popular trend among content creators.',
    viralScore: 88,
    tags: ['AI', 'Music', 'Videos']
  },
  {
    id: 'instagram-1',
    title: 'AI Fashion Filters',
    category: 'Fashion',
    platform: 'Instagram',
    engagement: '9.1K posts',
    timeAgo: '4 hours ago',
    description: 'Instagram users are experimenting with AI-generated fashion filters for unique looks.',
    viralScore: 80,
    tags: ['AI', 'Fashion', 'Filters']
  },
  {
    id: 'news-1',
    title: 'AI in Healthcare Breakthrough',
    category: 'News',
    platform: 'News Outlets',
    engagement: '4.5K shares',
    timeAgo: '6 hours ago',
    description: 'Recent articles highlight AI advancements in healthcare diagnostics.',
    viralScore: 75,
    tags: ['AI', 'Healthcare', 'Innovation']
  }
];

export async function GET() {
  return NextResponse.json({ trends: mockTrends });
}
