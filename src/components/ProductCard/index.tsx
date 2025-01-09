import { CheckFat, ShoppingCartSimple } from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCart } from '../../hooks/useCart'
import { ProductProps } from '../../utils/data/products'
import { format } from '../../utils/functions/formatter'
import { ButtonIcon } from '../ButtonIcon'
import { InputNumber } from '../Forms/InputNumber'
import { AddToCart, Buy, Heading, Price, ProductContainer, Tags } from './styles'

interface ProductCardProps {
  product: ProductProps
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, checkProductExistsInCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const { id, name, description, image, price } = product
  const isProductAddedToCart = checkProductExistsInCart(id)
  const isIncrementButtonDisabled = isProductAddedToCart
  const isDecrementButtonDisabled = isProductAddedToCart || quantity === 1

  function handleIncrementQuantity() {
    setQuantity((state) => state + 1)
  }

  function handleDecrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }

  function handleAddProductToCart() {
    console.log("đây", id, name, price)
    addToCart({
      id,
      name,
      image,
      price,
      quantity,
    })
    setQuantity(1)

    toast.success('Produto adicionado no carrinho.')
  }

  function formatPrice(value: number): string {
    return new Intl.NumberFormat('vi-VN').format(value);
  }
  return (
    <ProductContainer>
      <img src={image} alt={name} />

      <Tags>
        {/* {tags.map((tag) => {
          return <li key={tag}>{tag}</li>
        })} */}
      </Tags>

      <Heading>
        <h3>{name}</h3>
        <p>{description}</p>
      </Heading>

      <Buy>
        <Price>
          Giá:<span>{formatPrice(price)}</span>
        </Price>

        <AddToCart>
          <InputNumber
            quantity={quantity}
            disableIncrementButton={isIncrementButtonDisabled}
            disableDecrementButton={isDecrementButtonDisabled}
            incrementQuantity={handleIncrementQuantity}
            decrementQuantity={handleDecrementQuantity}
          />

          {isProductAddedToCart ? (
            <ButtonIcon variant="yellow" disabled={true}>
              <CheckFat size={22} weight="fill" />
            </ButtonIcon>
          ) : (
            <ButtonIcon onClick={handleAddProductToCart}>
              <ShoppingCartSimple size={22} weight="fill" />
            </ButtonIcon>
          )}
        </AddToCart>
      </Buy>
    </ProductContainer>
  )
}
