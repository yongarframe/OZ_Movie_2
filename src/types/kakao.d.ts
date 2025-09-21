// src/types/kakao.d.ts
export {}

declare global {
  interface Kakao {
    init: (key: string) => void
    isInitialized: () => boolean
    Share: {
      sendDefault: (options: KakaoShareDefaultOptions) => void
    }
  }

  interface KakaoShareDefaultOptions {
    objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text'
    content: {
      title: string
      description?: string
      imageUrl: string
      link: {
        mobileWebUrl: string
        webUrl: string
      }
    }
    itemContent?: {
      profileText?: string
      profileImageUrl?: string
      titleImageUrl?: string
      titleImageText?: string
      titleImageCategory?: string
      items?: { item: string; itemOp: string }[]
      sum?: string
      sumOp?: string
    }
    social?: {
      likeCount?: number
      commentCount?: number
      sharedCount?: number
      viewCount?: number
      subscriberCount?: number
    }
    buttons?: {
      title: string
      link: {
        mobileWebUrl: string
        webUrl: string
      }
    }[]
  }

  interface Window {
    Kakao: Kakao
  }
}
