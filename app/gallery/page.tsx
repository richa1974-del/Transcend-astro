import React from 'react';
import { createServerClient } from '@/lib/supabase/server';
import GalleryClient from '@/components/marketing/GalleryClient';
import fs from 'fs';
import path from 'path';

export const revalidate = 0; // Always serve fresh data

interface DBGalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'astro';
  image_url: string;
  sort_order: number;
}

interface Collection {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'astro';
  cover: string;
  images: string[];
}

export default async function GalleryPage() {
  const supabase = createServerClient();
  let collections: Collection[] = [];

  try {
    const { data: dbItems, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });

    if (error) throw error;

    if (dbItems && dbItems.length > 0) {
      // Group items by title into project collections
      const collectionsMap: { [title: string]: Collection } = {};
      
      dbItems.forEach((item: DBGalleryItem) => {
        const title = item.title || 'Untitled Project';
        const category = item.category || 'residential';

        if (!collectionsMap[title]) {
          collectionsMap[title] = {
            id: item.id,
            title: title,
            category: category,
            cover: item.image_url,
            images: [item.image_url],
          };
        } else {
          collectionsMap[title].images.push(item.image_url);
        }
      });
      
      collections = Object.values(collectionsMap);
    }
  } catch (err) {
    console.warn('Supabase fetch failed or is unconfigured. Falling back to local manifest.', err);
  }

  // Fallback to static manifest if no db items loaded (e.g., at build time or local run)
  if (collections.length === 0) {
    try {
      const manifestPath = path.join(process.cwd(), 'public', 'assets', 'gallery-manifest.json');
      const fileContent = fs.readFileSync(manifestPath, 'utf8');
      const staticData = JSON.parse(fileContent);

      collections = staticData.map((col: any) => {
        // Map legacy categories to our DB category enum check values
        let category: 'residential' | 'commercial' | 'hospitality' | 'astro' = 'residential';
        if (col.category === 'offices') category = 'commercial';
        if (col.category === 'residences') category = 'residential';
        if (col.category === 'hospitality') category = 'hospitality';
        if (col.category === 'astro') category = 'astro';

        // Add leading slash for public assets folder paths
        const addLeadingSlash = (p: string) => p.startsWith('/') ? p : '/' + p;

        return {
          id: col.id,
          title: col.title,
          category: category,
          cover: addLeadingSlash(col.cover),
          images: col.images.map((img: string) => addLeadingSlash(img)),
        };
      });
    } catch (manifestErr) {
      console.error('Failed to load static gallery manifest:', manifestErr);
    }
  }

  return <GalleryClient initialCollections={collections} />;
}
