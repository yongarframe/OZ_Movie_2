import { useSupabase } from '@/supabase/context/useSupabase'
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from '../utilities'

export const useEmailAuth = () => {
  const supabase = useSupabase()
  const { setItemToLocalStorage } = localStorageUtils()

  const signUp = async ({
    email,
    password,
    ...userData
  }: {
    email: string
    password: string
    [key: string]: unknown
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            avatar_url:
              'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295396_1280.png',
            ...userData,
          },
        },
      })

      const userInfo = changeFromDto(
        !error
          ? { type: DTO_TYPE.user, dto: { user: data.user, error: null } }
          : { type: DTO_TYPE.error, dto: { user: null, error } }
      )

      if (userInfo?.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo)
      } else {
        throw new Error(
          `status: ${userInfo?.error.status}, message: ${userInfo?.error.message}`
        )
      }
      return userInfo
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error // 원래 메시지 유지
      }
      throw new Error('알 수 없는 오류가 발생했습니다.')
    }
  }

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      const userInfo = changeFromDto(
        !error
          ? { type: DTO_TYPE.user, dto: { user: data.user, error: null } }
          : { type: DTO_TYPE.error, dto: { user: null, error } }
      )
      if (userInfo?.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo)
        return userInfo
      } else {
        throw new Error(
          `status: ${userInfo?.error.status}, message: ${userInfo?.error.message}`
        )
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('알 수 없는 오류가 발생했습니다.')
    }
  }

  return { signUp, login }
}
