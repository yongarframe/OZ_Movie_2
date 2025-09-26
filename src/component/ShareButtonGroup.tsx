import { IoIosShareAlt } from 'react-icons/io'
import kakaoShareButton from '@/assets/kakaotalk_sharing_btn_small.png'
import { cva } from 'class-variance-authority'
import { cn } from '@/util/cn'

interface ShareButtonGroupPropsType {
  setShareErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  setIsShareErrorModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  id: number
  title: string
  poster_path: string
  className?: string
  touchEnabled: boolean
}

const kakaoButton = cva(
  'flex flex-col justify-center items-center absolute z-50',
  {
    variants: {
      mobile: {
        true: 'md:hidden right-2 top-10 gap-2',
        false: 'right-2 top-10 md:opacity-0 gap-2 md:group-hover:opacity-100',
      },
    },
    defaultVariants: {
      mobile: false,
    },
  }
)

export default function ShareButtonGroup({
  setShareErrorMessage,
  setIsShareErrorModalOpen,
  id,
  title,
  poster_path,
  className,
  touchEnabled,
}: ShareButtonGroupPropsType) {
  const handleWebShare = async (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation()
    const url = `${window.location.origin}/movie/${id}`

    if (navigator.share) {
      try {
        await navigator.share({ url })
      } catch (error) {
        let message = '공유 중 알 수 없는 오류가 발생했습니다.'

        if (error instanceof Error) {
          message = error.message
        }

        setShareErrorMessage(message)
        setIsShareErrorModalOpen(true)
      }
    } else {
      setShareErrorMessage(
        '이 브라우저에서는 Web Share 기능이 지원되지 않습니다.'
      )
      setIsShareErrorModalOpen(true)
    }
  }

  const handleKakaoShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const kakao = window.Kakao
    const url = `${window.location.origin}/movie/${id}`
    if (kakao) {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description: '이 영화 어때요?',
          imageUrl: `https://image.tmdb.org/t/p/w500${poster_path}`,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      })
    }
  }
  return (
    <div className={cn(kakaoButton({ mobile: touchEnabled }), className)}>
      <IoIosShareAlt
        size={30}
        onClick={handleWebShare}
        className="text-white"
      />
      <button
        aria-label={`${title}영화 카카오 공유 버튼`}
        onClick={handleKakaoShare}
      >
        <img
          src={kakaoShareButton}
          alt={`${title} 카카오 공유 버튼 이미지`}
          className="cursor-pointer h-7"
        />
      </button>
    </div>
  )
}
