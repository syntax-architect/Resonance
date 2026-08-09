-- Create play_history table
CREATE TABLE IF NOT EXISTS play_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  song_id TEXT NOT NULL,
  song_title TEXT NOT NULL,
  song_artist TEXT NOT NULL,
  song_img TEXT NOT NULL,
  song_url TEXT NOT NULL,
  played_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE play_history ENABLE ROW LEVEL SECURITY;

-- Drop policy if exists to allow re-running
DROP POLICY IF EXISTS "Users can manage their own play history" ON play_history;

-- Policies for play_history
CREATE POLICY "Users can manage their own play history" ON play_history
  FOR ALL
  USING (user_id = auth.uid()::text)
  WITH CHECK (user_id = auth.uid()::text);
