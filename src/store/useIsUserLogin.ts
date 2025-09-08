import { create } from 'zustand'

interface IsUserLoginState {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
}

export const useIsUserLogin = create<IsUserLoginState>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) =>
    set(() => {
      return { isLogin: !!isLogin }
    }),
}))
