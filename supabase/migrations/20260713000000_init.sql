-- Create users table and custom roles
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('super_admin', 'admin', 'sales', 'marketing', 'content_editor', 'viewer')) DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS) on users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT,
    birth_details JSONB, -- { date, time, place, chart_coordinates }
    property_type TEXT,
    budget DECIMAL(12, 2),
    service_interested TEXT,
    status TEXT CHECK (status IN ('new', 'contacted', 'scheduled', 'report_sent', 'negotiation', 'won', 'lost', 'archived')) DEFAULT 'new',
    source TEXT DEFAULT 'contact_form',
    utm_parameters JSONB, -- { utm_source, utm_medium, utm_campaign }
    notes TEXT,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    last_contact_at TIMESTAMP WITH TIME ZONE,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create activity_logs table for lead interaction timeline
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL, -- 'status_change', 'comment', 'email_sent', 'file_uploaded'
    description TEXT NOT NULL,
    performed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create testimonials table
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    text_content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    image_url TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create gallery_items table
CREATE TABLE gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('residential', 'commercial', 'hospitality', 'astro')) DEFAULT 'residential',
    tags TEXT, -- Comma-separated or tag list
    image_url TEXT NOT NULL,
    status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies Setup (Super admins can do anything, specific roles get select/edit rights)
CREATE POLICY "Allow public read access to approved testimonials" ON testimonials
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Allow public read access to published gallery items" ON gallery_items
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow authenticated users to read leads" ON leads
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert/update leads" ON leads
    FOR ALL TO authenticated USING (true);
