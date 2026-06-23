-- Create Projects Table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  technical_details text NOT NULL,
  github_url text,
  demo_url text,
  image_urls text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Experience Table
CREATE TABLE public.experience (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  role text NOT NULL,
  company text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create About Table (Single row for config)
CREATE TABLE public.about (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  headline text NOT NULL,
  sub_headline text NOT NULL,
  bio text NOT NULL,
  skills text[] DEFAULT '{}',
  gallery_urls text[] DEFAULT '{}'
);

-- Create Enquiries Table
CREATE TABLE public.enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create OTP Sessions Table (For Admin Auth)
CREATE TABLE public.otp_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  otp_hash text NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_sessions ENABLE ROW LEVEL SECURITY;

-- Public can read projects, experience, about
CREATE POLICY "Allow public read access on projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access on experience" ON public.experience FOR SELECT USING (true);
CREATE POLICY "Allow public read access on about" ON public.about FOR SELECT USING (true);

-- Public can INSERT enquiries, but not read them
CREATE POLICY "Allow public insert on enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- OTP Sessions are completely private to the server (No public policies)
