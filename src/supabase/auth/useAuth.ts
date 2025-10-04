import { useSupabase } from '@/supabase/context/useSupabase'
import {
  changeFromDto,
  DTO_TYPE,
  localStorageUtils,
  USER_INFO_KEY,
} from '../utilities'

export const useAuth = () => {
  const supabase = useSupabase()
  const {
    removeItemFromLocalStorage,
    setItemToLocalStorage,
    getItemFromLocalStorage,
  } = localStorageUtils()

  // 로그아웃
  const logout = async () => {
    removeItemFromLocalStorage(USER_INFO_KEY.sbKey)
    removeItemFromLocalStorage(USER_INFO_KEY.customKey)
    return await supabase.auth.signOut()
  }

  // user 정보 가져오기 - Supabase 세션 API 사용으로 안정화

  const getUserInfo = async () => {
    const data = getItemFromLocalStorage(USER_INFO_KEY.sbKey)
    if (data) {
      // localStorage에서 가져온 데이터는 이미 처리된 UserInfo 타입이므로 그대로 반환
      if (data.user) {
        setItemToLocalStorage(USER_INFO_KEY.customKey, data)
      }
      return data
    } else {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) {
          const userInfo = changeFromDto({
            type: DTO_TYPE.error,
            dto: { user: null, error },
          })
          return userInfo
        }
        const userInfo = changeFromDto({
          type: DTO_TYPE.user,
          dto: { user: data.user, error: null },
        })
        if (userInfo?.user) {
          setItemToLocalStorage(USER_INFO_KEY.customKey, userInfo)
        }
        return userInfo
      } catch {
        void 0
      }
    }
  }
  return { logout, getUserInfo }
}
