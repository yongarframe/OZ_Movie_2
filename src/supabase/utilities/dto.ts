import { DTO_TYPE } from './config'
import type { User, AuthError } from '@supabase/supabase-js'

export type AppUser = {
  id: string
  email: string
  userName: string
  profileImageUrl?: string
}

export type UserDto = { user: User | null; error: null }
export type ErrorDto = { user: null; error: AuthError | null }

export type ChangeFromDtoInput =
  | { type: 'user'; dto: UserDto }
  | { type: 'error'; dto: ErrorDto }

export type ChangeFromDtoResult =
  | { user: AppUser }
  | { error: { status: number; message: string } }

// User data 매핑용 함수
export const changeFromDto = ({ type, dto }: ChangeFromDtoInput) => {
  switch (type) {
    case DTO_TYPE.user: {
      const { user_metadata: userInfo } = dto?.user ?? {}
      if (!userInfo) {
        return {
          error: {
            status: 400,
            message: '유저 정보가 존재하지 않습니다.',
          },
        }
      }
      return {
        user: {
          id: userInfo.sub,
          email: userInfo.email,
          userName: userInfo.userName
            ? userInfo.userName
            : userInfo.email.split('@')[0],
          profileImageUrl: userInfo.avatar_url,
        },
      }
    }
    case DTO_TYPE.error: {
      if (!dto.error) {
        return {
          error: {
            status: 500,
            message:
              'DTO_TYPE ERROR를 확인해주세요. 데이터 내부 error 객체가 없습니다.',
          },
        }
      }

      const { error: rawError } = dto

      return {
        error: {
          status: rawError.status ?? 500,
          message: rawError.message,
        },
      }
    }

    default:
      new Error('wrong type accessed')
      return
  }
}
