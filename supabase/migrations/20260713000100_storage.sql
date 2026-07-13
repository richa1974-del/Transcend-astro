-- Create storage bucket for media assets if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security on storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Set up policies for the media bucket

-- 1. Allow anyone to view media assets (Public Read)
CREATE POLICY "Allow public read access to media bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'media');

-- 2. Allow authenticated administrators to upload media (Secure Write)
CREATE POLICY "Allow authenticated uploads to media bucket" ON storage.objects
    FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

-- 3. Allow authenticated administrators to delete media assets (Secure Delete)
CREATE POLICY "Allow authenticated deletes from media bucket" ON storage.objects
    FOR DELETE TO authenticated USING (bucket_id = 'media');
