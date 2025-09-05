import type { UserInfo } from '@/types/userInfo'

// 로컬 스토리지 사용 함수
export const localStorageUtils = () => {
  const setItemToLocalStorage = (itemKey: string, item: UserInfo) => {
    const strItem = JSON.stringify(item)
    localStorage.setItem(itemKey, strItem)
  }
  const removeItemFromLocalStorage = (itemKey: string) => {
    localStorage.removeItem(itemKey)
  }
  const getItemFromLocalStorage = (itemKey: string) => {
    const strItem = localStorage.getItem(itemKey)
    if (!strItem) return null
    try {
      return JSON.parse(strItem) as UserInfo
    } catch (e) {
      console.error('Failed to parse localStorage item:', e)
      return null
    }
  }
  return {
    setItemToLocalStorage,
    removeItemFromLocalStorage,
    getItemFromLocalStorage,
  }
}
