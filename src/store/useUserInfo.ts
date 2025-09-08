import type { UserInfo } from '@/types/userInfo'
import { create } from 'zustand'

interface UserInfoState {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo | null) => void
}

export const useUserInfo = create<UserInfoState>((set) => ({
  userInfo: null,
  setUserInfo: async (userInfo) => {
    set(() => ({ userInfo: userInfo }))
  },
}))
