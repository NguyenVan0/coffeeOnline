import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { RadioControl, RadioGroup, RadioLabel } from './styles'

interface InputRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  children: ReactNode
}

export const InputRadio = forwardRef<HTMLInputElement, InputRadioProps>(
  ({ children, id, ...rest }: InputRadioProps, ref) => {
    return (
      <RadioGroup>
        <RadioControl type="radio" id={id} ref={ref} {...rest} />
        <RadioLabel htmlFor={id}>{children}</RadioLabel>
      </RadioGroup>
    )
  }
)

InputRadio.displayName = 'InputRadio'
