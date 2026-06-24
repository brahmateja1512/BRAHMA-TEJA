-- Run this script in your Supabase SQL Editor to add the new fields

ALTER TABLE contact_messages
ADD COLUMN IF NOT EXISTS subject text,
ADD COLUMN IF NOT EXISTS company text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS project_type text;
