// Fetches top Reddit posts from r/popular
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://www.reddit.com/r/popular.json');
  const data = await res.json();

  const simplified = data.data.children.map((item: any) => ({
    title: item.data.title,
    subreddit: item.data.subreddit,
    url: `https://reddit.com${item.data.permalink}`,
    upvotes: item.data.ups,
    thumbnail: item.data.thumbnail?.startsWith('http') ? item.data.thumbnail : null
  }));

  return NextResponse.json(simplified);
}
