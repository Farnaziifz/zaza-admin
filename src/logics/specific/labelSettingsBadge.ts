import { badgeValues, badgeItem } from '@/core/types/badge.type'
import { badgeApi } from '@/resources/api/badge'
import { badgeType } from '@/core/enums/badgeType.enum'
import { badgePresentationData } from '@/core/types/badge.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = badgeApi()

const destructBadgeDataValue = (badgeData: object): badgeValues => {
  let gold = 0
  let silver = 0
  let bronze = 0

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  badgeData.forEach((el) => {
    switch (el.type) {
      case badgeType.GOLD:
        gold = el.value
        break
      case badgeType.SILVER:
        silver = el.value
        break
      case badgeType.BRONZE:
        bronze = el.value
        break
    }
  })

  return {
    gold,
    silver,
    bronze,
  }
}

const isBadgeDataValid = (badgeData: object) => {
  const { gold, silver, bronze } = destructBadgeDataValue(badgeData)

  if (gold && (gold <= silver || gold <= bronze)) return false

  if (silver && silver <= bronze) return false

  return true
}

export const mapServerDataToInitialDataHandler = (
  initData: object[],
  serverData: object[]
) => {
  initData.forEach((badge) => {
    serverData.forEach((serverData) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (badge.type === serverData.type) badge.value = serverData.amount
    })
  })
}

export const initHandler = async () => {
  const res = await api.get()
  const badge = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return badge
  else {
    showErrorMessage()
  }
}

export const validateAndChangeServerDataHandler = async (
  badgeData: badgePresentationData[]
) => {
  if (!isBadgeDataValid(badgeData)) showErrorMessage('دیتای ورودی صحیح نمیباشد')

  const badgeItems: badgeItem[] = []
  badgeData.forEach((el) => {
    badgeItems.push({ type: el.type, amount: el.value })
  })

  showLoadingMessage()
  const res = await api.put(badgeItems)

  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}
