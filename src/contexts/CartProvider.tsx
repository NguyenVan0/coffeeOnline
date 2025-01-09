import { ReactNode, createContext, useEffect, useState } from 'react'
import { CheckoutFormData } from '../pages/Checkout'
import { ProductProps } from '../utils/data/products'

interface CartItemProps extends Pick<ProductProps, 'id' | 'name' | 'image' | 'price'> {
  quantity: number
}

interface ItemQuantityProps {
  productId: number
  quantity: number
}

interface BillingProps {
  paymentMethod: CheckoutFormData['paymentMethod']
  fee: number
  subtotal: number
  total: number
}

type ShippingProps = Omit<CheckoutFormData, 'paymentMethod'>

interface OrderProps {
  orderId: number | null
  items: CartItemProps[]
  billing: BillingProps | null
  shipping: ShippingProps | null
}

interface CartContextProps {
  cart: CartItemProps[]
  cartTotalItems: number
  order: OrderProps | null
  fee: number
  subtotal: number
  total: number
  addToCart: (product: CartItemProps) => void
  removeFromCart: (productId: number) => void
  updateCart: ({ productId, quantity }: ItemQuantityProps) => void
  checkProductExistsInCart: (productId: number) => boolean
  createOrder: (data: OrderProps) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItemProps[]>(() => {
    const storedStateAsJson = localStorage.getItem('@coffee-delivery:cart-1.0.0')

    if (storedStateAsJson) {
      return JSON.parse(storedStateAsJson)
    }

    return []
  })
  const [order, setOrder] = useState<OrderProps | null>(null)

  function addToCart(product: CartItemProps) {
    setCart((state) => [product, ...state])
  }

  function removeFromCart(productId: number) {
    const filteredCart = cart.filter((product) => product.id !== productId)

    setCart(filteredCart)
  }

  function updateCart({ productId, quantity }: ItemQuantityProps) {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity }
      }

      return product
    })

    setCart(updatedCart)
  }

  function checkProductExistsInCart(productId: number) {
    const product = cart.findIndex((product) => product.id === productId)

    return product >= 0
  }

  function createOrder(data: OrderProps) {
    setOrder(data)
    setCart([])
  }

  useEffect(() => {
    const cartStateToJson = JSON.stringify(cart)

    localStorage.setItem('@coffee-delivery:cart-1.0.0', cartStateToJson)
  }, [cart])

  const cartTotalItems = cart.length
  const fee = cartTotalItems > 0 ? 3.5 : 0
  const subtotal = cart.reduce((acc, product) => {
    acc += product.price * product.quantity

    return acc
  }, 0)
  const total = subtotal + fee

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotalItems,
        order,
        fee,
        subtotal,
        total,
        addToCart,
        removeFromCart,
        updateCart,
        checkProductExistsInCart,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
