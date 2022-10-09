import router from '@/resources/router'

export const goToPath = (path: string) => {
  router.push(path)
}

export const returnToPreviousRoute = () => {
  router.back()
}
