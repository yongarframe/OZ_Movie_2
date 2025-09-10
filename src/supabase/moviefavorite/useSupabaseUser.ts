import { useState, useEffect } from 'react'
import { supabaseClient } from '@/supabase/context/supabaseClient'
import type { User } from '@supabase/supabase-js'

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null) // 초기값

  useEffect(() => {
    // 로그인 상태 구독
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    // 초기 세션 확인
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return user
}
