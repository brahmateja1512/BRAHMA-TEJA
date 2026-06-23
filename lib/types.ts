export interface Project {
  id: string;
  title: string;
  description: string;
  technical_details: string;
  github_url?: string | null;
  demo_url?: string | null;
  image_urls: string[];
  created_at: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  start_date: string;
  end_date?: string | null;
  description: string;
  created_at: string;
}

export interface About {
  id: string;
  headline: string;
  sub_headline: string;
  bio: string;
  skills: string[];
  gallery_urls: string[];
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface OTPSession {
  id: string;
  email: string;
  otp_hash: string;
  expires_at: string;
  created_at: string;
}
