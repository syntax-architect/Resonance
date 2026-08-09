import { useSession } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

export function useSupabase() {
  const { session } = useSession();

  return useMemo(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!session) {
      // Return unauthenticated client if no user session
      return createClient(supabaseUrl, supabaseKey);
    }

    // Return authenticated client using Clerk JWT
    return createClient(supabaseUrl, supabaseKey, {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session.getToken({ template: 'supabase' });
          
          const headers = new Headers(options?.headers);
          headers.set('Authorization', `Bearer ${clerkToken}`);

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    });
  }, [session]);
}
