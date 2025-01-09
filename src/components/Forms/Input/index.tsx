import { InputHTMLAttributes, forwardRef } from 'react'
import { InputControl, InputError, InputGroup, Optional } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  optional?: boolean
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ columns, optional, error, ...rest }: InputProps, ref) => {
    return (
      <InputGroup $cols={columns}>
        <InputControl ref={ref} {...rest} />
        {optional && <Optional>Opcional</Optional>}

        {error && <InputError>{error}</InputError>}
      </InputGroup>
    )
  }
)

Input.displayName = 'Input'
