export const toPersianCurrency = (
  number: number,
  symbol: string | null
  // decimals: number | null
) => {
  symbol = symbol != null ? symbol : 'ریال'
  const filterd =
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + symbol
  return filterd
}
