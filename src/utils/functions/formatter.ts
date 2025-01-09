const formatPrice = (amount: number, displaySymbol: boolean = true) => {
  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)

  return displaySymbol ? priceFormatted : priceFormatted.replace('Giá', '').trim()
}

const formatZipcode = (value: string) => {
  if (!value) return ''

  const onlyDigits = value.replace(/\D/g, '')
  const zipcode = onlyDigits.replace(/(\d{5})(\d)/, '$1-$2').substring(0, 9)

  return zipcode
}

export const format = {
  price: formatPrice,
  zipcode: formatZipcode,
}
