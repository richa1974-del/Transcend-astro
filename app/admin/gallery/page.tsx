import React from 'react';
import { createServerClient } from '@/lib/supabase/server';
import MediaLibrary from '@/components/admin/MediaLibrary';

export const revalidate = 0; // Fresh metrics on gallery load

export default async function AdminGallery() {
  const supabase = createServerClient();

  // Asynchronously load gallery items
  let items: any[] = [];
  try {
    const { data: dbItems } = await supabase
      .from('gallery_items')
      .select('*')
      .order('sort_order', { ascending: true });
    items = dbItems || [];
  } catch (error) {
    console.error('Failed to load gallery items from Supabase database.', error);
  }

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">Gallery CMS & Media Library</h2>
        <p className="text-sm text-slate-500">Upload portfolio assets, configure tag descriptions, and manage live display configurations.</p>
      </div>

      {/* Media Library */}
      <MediaLibrary initialItems={items} />
    </div>
  );
}
