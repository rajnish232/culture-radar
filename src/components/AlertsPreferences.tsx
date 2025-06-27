'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const TOPICS = [
  'TikTok',
  'AI Tools',
  'Crypto',
  'Meme Formats',
  'Celebrity Drama',
  'Sports',
  'YouTube'
];

export default function AlertsPreferences() {
  const [selected, setSelected] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the current logged-in user
    supabase.auth.getUser().then(async ({ data }: { data: { user: { id: string } | null } }) => {
      const id = data?.user?.id || null;
      setUserId(id);

      if (!id) {
        console.error('User not logged in');
        setLoading(false);
        return;
      }

      // Fetch existing preferences
      const { data: pref } = await supabase
        .from('preferences')
        .select('topics')
        .eq('user_id', id)
        .single();

      if (pref?.topics) {
        setSelected(pref.topics);
      }

      setLoading(false);
    });
  }, []);

  const toggle = async (topic: string) => {
    if (!userId) return;

    const updated = selected.includes(topic)
      ? selected.filter(t => t !== topic)
      : [...selected, topic];

    setSelected(updated);

    // Save to Supabase
    await supabase
      .from('preferences')
      .upsert({ user_id: userId, topics: updated }, { onConflict: 'user_id' });
  };

  if (loading) return <p>Loading preferences...</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">🛎️ Choose Your Alert Topics</h2>
      <div className="grid grid-cols-2 gap-2">
        {TOPICS.map(topic => (
          <label key={topic} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(topic)}
              onChange={() => toggle(topic)}
            />
            <span>{topic}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
