'use client';

import { useEffect, useState } from 'react';
import { supabase } from 'src/utils/supabaseClient';

const PERSONALITY_OPTIONS = [
  'Default',
  'Gen Z Buddy',
  'Sarcastic Analyst',
  'Hype Beast'
];

export default function PersonalitySelector() {
  const [selected, setSelected] = useState('Default');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user and personality
    supabase.auth.getUser().then(async ({ data }) => {
      const id = data?.user?.id;
      setUserId(id || null);
      if (!id) return;

      const { data: pref } = await supabase
        .from('preferences')
        .select('personality')
        .eq('user_id', id)
        .single();

      if (pref?.personality) {
        setSelected(pref.personality);
      }
    });
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    if (!userId) return;

    await supabase
      .from('preferences')
      .update({ personality: value })
      .eq('user_id', userId);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-4">
      <label className="text-sm font-medium text-gray-700">🤖 Bot Personality</label>
      <select
        value={selected}
        onChange={handleChange}
        className="mt-1 w-full border p-2 rounded"
      >
        {PERSONALITY_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
