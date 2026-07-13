import { createClient } from '@supabase/supabase-js';

// Recursive build-safe proxy generator to support arbitrary query builder chaining
const makeSafeProxy = () => {
  const proxy: any = new Proxy(() => proxy, {
    get: (target, prop) => {
      if (prop === 'then') {
        return (resolve: any) => resolve({ data: [], count: 0, error: null });
      }
      return proxy;
    }
  });
  return proxy;
};

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    // Return a dummy client proxy to prevent build-time errors when env vars are not set
    return makeSafeProxy();
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
