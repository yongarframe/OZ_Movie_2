export type UserInfo =
  | {
      user: {
        id: string
        email: string
        userName: string
        profileImageUrl: string
      }
      error?: unknown
    }
  | {
      error: {
        status: number
        message: string
      }
      user?: undefined
    }
  | undefined
