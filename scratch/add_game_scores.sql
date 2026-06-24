-- Run this script in your Supabase SQL Editor to create the Leaderboard table

CREATE TABLE IF NOT EXISTS game_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_name TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anonymous) to insert their score
CREATE POLICY "Allow public inserts on game_scores"
ON game_scores FOR INSERT
TO public
WITH CHECK (true);

-- Allow anyone to read all scores for the leaderboard
CREATE POLICY "Allow public reads on game_scores"
ON game_scores FOR SELECT
TO public
USING (true);
