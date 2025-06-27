export interface NicheSource {
  id: string;
  name: string;
  platform: string;
  handle: string;
  category: string;
  isActive: boolean;
  lastUpdate: string;
  avatar?: string;
}

export interface NichePage {
  id: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  sources: NicheSource[];
  isPublic: boolean;
  color: string;
  createdAt: string;
}

export interface NicheUpdate {
  id: string;
  pageId: string;
  sourceName: string;
  platform: string;
  title: string;
  content: string;
  mediaType: 'text' | 'image' | 'video' | 'link';
  timestamp: string;
  engagement: string;
  tags: string[];
}

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
