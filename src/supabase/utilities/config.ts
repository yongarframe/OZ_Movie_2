import { supabaseEnv } from '@/supabase/utilities/env'

// localStorage Key
export const USER_INFO_KEY = {
  sbKey: `sb-${supabaseEnv.projectURL.split('//')[1].split('.')[0]}-auth-token`,
  customKey: 'userInfo',
}

// data transfer object type
export const DTO_TYPE = {
  user: 'user',
  error: 'error',
} as const

export type DTO_TYPE = (typeof DTO_TYPE)[keyof typeof DTO_TYPE]
