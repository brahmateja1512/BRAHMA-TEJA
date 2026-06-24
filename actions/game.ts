'use server'

import { supabase } from '@/lib/supabase'

export async function submitGameScore(playerName: string, score: number) {
  try {
    const { error } = await supabase
      .from('game_scores')
      .insert([{ player_name: playerName, score }])

    if (error) {
      console.error('Error submitting game score:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Server error submitting score:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function getTopScores(limit: number = 5) {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select('player_name, score, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true }) // If tie, older score wins
      .limit(limit)

    if (error) {
      console.error('Error fetching top scores:', error)
      return { success: false, data: [] }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Server error fetching top scores:', error)
    return { success: false, data: [] }
  }
}
