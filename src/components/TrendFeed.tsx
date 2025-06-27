'use client';
import { useEffect, useState } from 'react';
import { TrendCard } from './TrendCard';

type RedditPost = {
  title: string;
  subreddit: string;
  url: string;
  upvotes: number;
  thumbnail: string | null;
};

const TOPIC_KEYWORDS: Record<string, string[]> = {
  TikTok: ['tiktok'],
  'AI Tools': ['ai', 'openai', 'chatgpt', 'gpt', 'gemini'],
  Crypto: ['crypto', 'bitcoin', 'ethereum', 'web3'],
  'Meme Formats': ['meme', 'format', 'template'],
  'Celebrity Drama': ['celebrity', 'kardashian', 'drama', 'scandal'],
  Sports: ['fifa', 'nba', 'goal', 'match', 'lebron'],
  YouTube: ['youtube', 'mrbeast', 'youtuber', 'vlog'],
};

function postMatchesTopic(post: RedditPost, topics: string[]): boolean {
  const text = `${post.title} ${post.subreddit}`.toLowerCase();
  for (const topic of topics) {
    const keywords = TOPIC_KEYWORDS[topic] || [];
    if (keywords.some(k => text.includes(k))) {
      return true;
    }
  }
  return false;
}

export default function TrendFeed() {
  const [trends, setTrends] = useState<RedditPost[]>([]);
  const [filtered, setFiltered] = useState<RedditPost[]>([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const res = await fetch('/api/reddit');
      const data = await res.json();
      setTrends(data);
    };

    fetchTrends();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('userAlerts');
    const selectedTopics = saved ? JSON.parse(saved) : [];

    const result = trends.filter(post => postMatchesTopic(post, selectedTopics));
    setFiltered(result);
  }, [trends]);

  return (
    <div className="grid gap-4 p-4">
      {filtered.length > 0 ? (
        filtered.map((post, idx) => (
          <TrendCard
            key={idx}
            title={post.title}
            subtitle={`r/${post.subreddit} • 👍 ${post.upvotes}`}
            image={post.thumbnail}
            link={post.url}
          />
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">
          No trends match your selected topics. Try updating your alert settings.
        </p>
      )}
    </div>
  );
}
