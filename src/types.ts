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
  link?: string;
}

export interface NicheSource {
  id: string;
  name: string;
  platform: string;
  handle: string;
  avatar?: string;
  category: string;
  isActive: boolean;
  lastUpdate: string;
  followerCount?: string;
}

export interface NichePage {
  id: string;
  name: string;
  description: string;
  category: string;
  sources: NicheSource[];
  keywords: string[];
  createdAt: string;
  isPublic: boolean;
  color: string;
}

export interface NicheUpdate {
  id: string;
  sourceId: string;
  sourceName: string;
  platform: string;
  title: string;
  content: string;
  timestamp: string;
  engagement: string;
  link: string;
  mediaType: 'text' | 'image' | 'video' | 'link';
  tags: string[];
}
