import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from './styles'

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'purple' | 'yellow'
}

export function ButtonIcon({ children, variant, ...rest }: ButtonIconProps) {
  return (
    <Button {...rest} $variant={variant}>
      {children}
    </Button>
  )
}
