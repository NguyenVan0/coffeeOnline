import { Trash } from "@phosphor-icons/react";
import { ButtonSecondary } from "../../../../components/ButtonSecondary";
import { InputNumber } from "../../../../components/Forms/InputNumber";
import { useCart } from "../../../../hooks/useCart";
import { ProductProps } from "../../../../utils/data/products";
import { Actions, Details, Heading, ProductContainer } from "./styles";

interface CartItemProps
  extends Pick<ProductProps, "id" | "name" | "image" | "price"> {
  quantity: number;
}

interface ProductCardSimpleProps {
  product: CartItemProps;
}

export function ProductCardSimple({ product }: ProductCardSimpleProps) {
  const { removeFromCart, updateCart } = useCart();
  const { id, name, image, price, quantity } = product;

  function handleIncrementQuantity() {
    updateCart({ productId: id, quantity: quantity + 1 });
  }

  function handleDecrementQuantity() {
    if (quantity > 1) {
      updateCart({ productId: id, quantity: quantity - 1 });
    }
  }

  function handleRemoveProductFromCart() {
    removeFromCart(id);
  }

  const isDecrementButtonDisabled = quantity === 1;
  function formatPrice(value: number): string {
    return new Intl.NumberFormat("vi-VN").format(value);
  }

  return (
    <ProductContainer>
      <img src={image} alt={name} />

      <Details>
        <Heading>
          <h3>{name}</h3>
          <span>Giá: {formatPrice(price)} VNĐ</span>
        </Heading>

        <Actions>
          <InputNumber
            quantity={quantity}
            disableDecrementButton={isDecrementButtonDisabled}
            incrementQuantity={handleIncrementQuantity}
            decrementQuantity={handleDecrementQuantity}
          />

          <ButtonSecondary type="button" onClick={handleRemoveProductFromCart}>
            <Trash size={16} />
            Xoá bỏ
          </ButtonSecondary>
        </Actions>
      </Details>
    </ProductContainer>
  );
}
