const setPaymentMethod = (value: string) => {
  let paymentMethodReadable

  switch (value) {
    case 'creditCard':
      paymentMethodReadable = 'Cartão de Crédito'
      break
    case 'debitCard':
      paymentMethodReadable = 'Cartão de Débito'
      break
    case 'cash':
      paymentMethodReadable = 'Dinheiro'
      break
    default:
      paymentMethodReadable = 'Método não identificado'
  }

  return paymentMethodReadable
}

export const mutate = {
  paymentMethod: setPaymentMethod,
}
