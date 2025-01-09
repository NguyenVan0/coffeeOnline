import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from './styles'

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fill?: boolean
}

export function ButtonPrimary({ children, fill, ...rest }: ButtonPrimaryProps) {
  return (
    <Button $fill={fill} {...rest}>
      {children}
    </Button>
  )
}
