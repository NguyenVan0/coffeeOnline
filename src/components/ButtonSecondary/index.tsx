import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from './styles'

interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function ButtonSecondary({ children, ...rest }: ButtonSecondaryProps) {
  return <Button {...rest}>{children}</Button>
}
