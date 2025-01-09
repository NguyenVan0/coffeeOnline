import { Minus, Plus } from '@phosphor-icons/react'
import { DecrementButton, IncrementButton, InputGroup } from './styles'

interface InputNumberProps {
  quantity: number
  disableIncrementButton?: boolean
  disableDecrementButton?: boolean
  incrementQuantity: () => void
  decrementQuantity: () => void
}

export function InputNumber({
  quantity,
  disableIncrementButton,
  disableDecrementButton,
  incrementQuantity,
  decrementQuantity,
}: InputNumberProps) {
  return (
    <InputGroup>
      <DecrementButton type="button" onClick={decrementQuantity} disabled={disableDecrementButton}>
        <Minus size={14} weight="bold" />
      </DecrementButton>

      <span>{quantity}</span>

      <IncrementButton type="button" onClick={incrementQuantity} disabled={disableIncrementButton}>
        <Plus size={14} weight="bold" />
      </IncrementButton>
    </InputGroup>
  )
}
