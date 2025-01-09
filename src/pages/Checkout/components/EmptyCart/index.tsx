import { ShoppingCart } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { CartContainer } from './styles'

export function EmptyCart() {
  return (
    <CartContainer>
      <ShoppingCart size={36} weight="fill" />

      <span>Giỏ hàng của bạn đang trống!</span>

      <Link to="/">khám phá các loại cà phê thơm ngon của chúng tôi</Link>
    </CartContainer>
  )
}
