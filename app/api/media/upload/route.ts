import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `gallery/${fileName}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Supabase keys are not configured on the server' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    // Proactively verify / create the media storage bucket
    try {
      await supabase.storage.createBucket('media', { public: true });
    } catch (bucketErr) {
      // Bucket might already exist, safe to ignore
      console.log('Bucket check completed');
    }

    // Upload the file buffer to the bucket
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, buffer, {
        contentType: file.type,
        duplex: 'half',
      });

    if (uploadError) throw uploadError;

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error: any) {
    console.error('Server Upload API Error:', error);
    return NextResponse.json({ error: error?.message || 'Server upload failed' }, { status: 500 });
  }
}
