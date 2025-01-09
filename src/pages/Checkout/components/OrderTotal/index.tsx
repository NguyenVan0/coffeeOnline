import { useCart } from '../../../../hooks/useCart'
import { format } from '../../../../utils/functions/formatter'
import { Label, OrderTotalContainer, Price } from './styles'

export function OrderTotal() {
  const { fee, subtotal, total } = useCart()
  function formatPrice(value: number): string {
    return new Intl.NumberFormat('vi-VN').format(value);
  }
  return (
    <OrderTotalContainer>
      <Label>Tổng giá trị các món</Label>
      <Price>{formatPrice(subtotal)} VNĐ</Price>

      <Label>Phí giao hàng</Label>
      <Price>{formatPrice(fee)} VNĐ</Price>

      <Label $bold>Tổng cộng</Label>
      <Price $bold>{formatPrice(total)} VNĐ</Price>
    </OrderTotalContainer>
  )
}
