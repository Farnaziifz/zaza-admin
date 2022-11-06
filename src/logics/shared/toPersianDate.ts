export const toPersianDate = (date: string | Date) => {
  const localTime = new Date(date).toLocaleDateString('fa-IR')
  return localTime
}
