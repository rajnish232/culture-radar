'use client';
import { useEffect, useState } from 'react';
import { supabase } from 'src/utils/supabaseClient';

export default function EmailSettings() {
  const [enabled, setEnabled] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

       useEffect(() => {
         supabase.auth.getUser().then(async ({ data, error }) => {
           console.log('Supabase getUser data:', data);
           console.log('Supabase getUser error:', error);
           const id = data?.user?.id;
           setUserId(id || null);
           if (!id) return;

      const { data: pref } = await supabase
        .from('preferences')
        .select('email_digest')
        .eq('user_id', id)
        .single();

      if (pref?.email_digest) setEnabled(pref.email_digest);
    });
  }, []);

  const toggleEmailDigest = async () => {
    if (!userId) return;
    const newValue = !enabled;
    setEnabled(newValue);
    await supabase
      .from('preferences')
      .update({ email_digest: newValue })
      .eq('user_id', userId);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          checked={enabled}
          onChange={toggleEmailDigest}
        />
        📬 Send me a daily culture trend email
      </label>
      <button
        onClick={async () => {
          try {
            const response = await fetch('/api/send-digest', {
              method: 'POST',
            });
            if (response.ok) {
              alert('Email digest sent successfully!');
            } else {
              const errorData = await response.json();
              alert(`Failed to send email digest: ${errorData.error.message || response.statusText}`);
            }
          } catch (error) {
            console.error('Error sending email digest:', error);
            alert('An error occurred while sending the email digest.');
          }
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Test Send Digest Email
      </button>
    </div>
  );
}
