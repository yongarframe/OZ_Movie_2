import { useSupabase } from '@/supabase/context/useSupabase'
import { AuthError } from '@supabase/supabase-js'

type OAuthOptions = {
  redirectTo?: string | null
  scopes?: string
  queryParams?: Record<string, string>
}

export const useOAuth = () => {
  const supabase = useSupabase()
  // 카카오 로그인
  const loginWithKakao = async (
    redirectTo: string | null = null,
    otherOptions: Omit<OAuthOptions, 'redirectTo'> = {}
  ) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: redirectTo ?? undefined,
          ...otherOptions,
        },
      })
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error(error.message)
      } else if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  // 구글 로그인
  const loginWithGoogle = async (
    redirectTo: string | null = null,
    otherOptions: Omit<OAuthOptions, 'redirectTo'> = {}
  ) => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo ?? undefined,
          ...otherOptions,
        },
      })
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error(error.message)
      } else if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('알 수 없는 오류가 발생했습니다.')
      }
    }
  }

  return { loginWithKakao, loginWithGoogle }
}
