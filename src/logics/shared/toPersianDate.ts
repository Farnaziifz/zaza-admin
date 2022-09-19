export const toPersianDate = (date: string) => {
  const localTime = new Date(date).toLocaleDateString('fa-IR')
  return localTime
}
