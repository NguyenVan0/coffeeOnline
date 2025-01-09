import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, CurrencyDollar, Money } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LocationPicker } from "../Address/address";
import { ButtonPrimary } from "../../components/ButtonPrimary";
import { InputRadio } from "../../components/Forms/InputRadio";
import { useCart } from "../../hooks/useCart";
import { OrderTotal } from "./components/OrderTotal";
import { ProductCardSimple } from "./components/ProductCardSimple";
import {
  Cart,
  CheckoutForm,
  Container,
  Delivery,
  InputRadioError,
  Order,
  PaymentMethods,
  PaymentMethodsFields,
} from "./styles";
import customerServices from "../../utils/services/customerServices";
import orderServices from "../../utils/services/orderOnlineServices";

const checkoutFormValidation = z.object({
  paymentMethod: z.enum(["creditCard", "debitCard", "cash"], {
    message: "Vui lòng chọn phương thức thanh toán",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutFormValidation>;

export function Checkout() {
  const id = localStorage.getItem("id"); // Lấy user_id từ localStorage
  const address = localStorage.getItem("address"); // Lấy địa chỉ từ localStorage

  const { cart, cartTotalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: "onSubmit",
    resolver: zodResolver(checkoutFormValidation),
  });

  const onFinish = async () => {
    if (cartTotalItems < 1) {
      alert("Giỏ hàng trống.");
      return;
    }

    try {
      const customerResponse = await customerServices.getCustomer({
        user_id: id,
      });

      if (customerResponse?.data?.data?.length > 0) {
        const id_customer = customerResponse.data.data[0]?.id;
        localStorage.setItem("idCustomer", id_customer);

        const dataSubmit = {
          id_customer,
          address: address
            ? `[${JSON.parse(address).lat}, ${JSON.parse(address).lng}]`
            : "",
          order_details: cart.map((product) => ({
            id_product: product.id,
            quanity: product.quantity,
            price: product.price,
          })),
        };

        const orderResponse = await orderServices.createOrder(dataSubmit);

        console.log("chuyển hướng:", orderResponse.data);
        clearCart(); // Xóa toàn bộ giỏ hàng sau khi đặt hàng thành công
        navigate(`/order/${orderResponse.data.id}`);
      } else {
        console.error("Không tìm thấy khách hàng:", customerResponse?.data);
        alert("Không thể xác định thông tin khách hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi khi xử lý thông tin. Vui lòng thử lại sau.");
    }
  };

  const isCompleteOrderButtonDisabled = cartTotalItems === 0;

  return (
    <main>
      <Container>
        <CheckoutForm onSubmit={handleSubmit(onFinish)}>
          <Delivery>
            <h2>Hoàn tất đơn hàng của bạn</h2>

            <LocationPicker />

            <PaymentMethods>
              <header>
                <CurrencyDollar size={22} />
                <div>
                  <h3>Thanh toán</h3>
                  <p>
                    Thanh toán khi nhận hàng. Hãy chọn phương thức thanh toán
                    phù hợp
                  </p>
                </div>
              </header>

              <PaymentMethodsFields>
                <InputRadio
                  id="creditCard"
                  defaultValue="creditCard"
                  {...register("paymentMethod")}
                >
                  <CreditCard size={16} />
                  Thẻ tín dụng
                </InputRadio>
                <InputRadio
                  id="cash"
                  defaultValue="cash"
                  {...register("paymentMethod")}
                >
                  <Money size={16} />
                  Tiền mặt
                </InputRadio>

                {errors.paymentMethod && (
                  <InputRadioError>
                    {errors.paymentMethod.message}
                  </InputRadioError>
                )}
              </PaymentMethodsFields>
            </PaymentMethods>
          </Delivery>

          <Cart>
            <h2>Các món đã chọn</h2>
            <Order>
              {cartTotalItems > 0 ? (
                cart.map((product) => (
                  <ProductCardSimple key={product.id} product={product} />
                ))
              ) : (
                <div>Giỏ hàng trống</div>
              )}

              <OrderTotal />

              <ButtonPrimary
                type="submit"
                fill
                disabled={isCompleteOrderButtonDisabled}
              >
                Xác nhận đơn hàng
              </ButtonPrimary>
            </Order>
          </Cart>
        </CheckoutForm>
      </Container>
    </main>
  );
}
