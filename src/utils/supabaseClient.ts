import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return document.cookie.split(';').find((c) => c.includes(name))?.split('=')[1];
      },
      set(name: string, value: string, options: any) {
        document.cookie = `${name}=${value}; ${Object.keys(options)
          .map((key) => `${key}=${options[key]}`)
          .join('; ')}`;
      },
      remove(name: string) {
        document.cookie = `${name}=; Max-Age=-99999999;`;
      },
    },
    cookieOptions: {
      domain: 'diddleduds.com', // Set the domain for the cookies
      sameSite: 'lax', // Corrected to lowercase 'lax'
      secure: true, // Recommended for HTTPS
    },
  }
);
