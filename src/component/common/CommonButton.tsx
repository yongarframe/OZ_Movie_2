import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/util/cn'

const ButtonVariants = cva(
  `rounded-[4px] px-4 py-2 text-sm font-light transition-colors cursor-pointer h-[35px] sm:h-[48px] w-full`,
  {
    variants: {
      variant: {
        primary: 'bg-[#8349ff] text-[#ffffff] hover:bg-amber-600',
        secondary:
          'bg-[#f9f5ff] text-[#8349ff] hover:bg-[#f2e9ff] hover:text-[#6e32ff]',
        grayStyle:
          'bg-[#ececec] text-[#4d4d4d] border-[#cecece] border-[1px] hover:bg-[#dedede]',
        disabled:
          'bg-[#ececec] text-[#cecece] cursor-not-allowed border-[#cecece] border-[1px]',
      },
      visualScale: {
        default: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  className?: string
  children?: React.ReactNode
  disabled?: boolean
  visualScale?: 'default' | 'md' | 'lg' | 'xl'
  onClick?: () => void
}

export default function CommonButton({
  variant = 'primary',
  visualScale = 'default',
  children,
  className,
  disabled = false,
  ...Props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(ButtonVariants({ variant, visualScale }), className)}
      {...Props}
    >
      {children && children}
    </button>
  )
}
