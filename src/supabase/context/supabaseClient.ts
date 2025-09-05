import { supabaseEnv } from '../utilities'
import { createClient } from '@supabase/supabase-js'
import { type Database } from '@/types/database.types'

// supabase 로그인 유지 세션 생성
export const supabaseClient = createClient<Database>(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
)
