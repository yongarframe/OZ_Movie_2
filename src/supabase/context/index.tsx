import { type ReactNode } from 'react'
import { supabaseClient } from '@/supabase/context/supabaseClient'
import { SUPABASE } from '@/supabase/context/useSupabase'

// supabase client를 사용하기 위한 provider 생성
export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  )
}
