import type { Database } from '@/types/database.types'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createContext, useContext } from 'react'

export const SUPABASE = createContext<SupabaseClient<Database> | null>(null)

export const useSupabase = () => {
  const supabase = useContext(SUPABASE)
  if (!supabase) throw new Error('supabase가 초기화 되지 않았습니다.')
  return supabase
}
