import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env credentials are not fully configured.');
}

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

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : makeSafeProxy();
