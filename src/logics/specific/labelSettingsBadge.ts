import { badge, badgeItem } from '../../core/types/badge.type'
import { badgeApi } from '../../resources/api/badge'
import { badgeType } from '../../core/enums/badgeType.enum'

const api = badgeApi()

const destructLabelsDataValue = (labelsData: object): badge => {
  let golden: number | undefined = 0
  let silver: number | undefined = 0
  let bronze: number | undefined = 0

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  labelsData.forEach((el) => {
    switch (el.type) {
      case badgeType.GOLD:
        golden = el.value
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
    golden,
    silver,
    bronze,
  }
}

const isLabelsDataFactoryValid = (labelsData: object) => {
  const { golden, silver, bronze } = destructLabelsDataValue(labelsData)

  if (golden && (golden <= silver || golden <= bronze)) return false

  if (silver && silver <= bronze) return false

  return true
}

export const mapServerDataToInitialData = (
  initData: object,
  serverData: object
) => {
  initData.forEach((label) => {
    serverData.forEach((serverData) => {
      if (label.type === serverData.type) label.value = serverData.amount
    })
  })
}

export const initHandler = async () => {
  const res = await api.get()
  const badge = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return badge
  else {
    throw 'error'
  }
}

export const validateAndChangeServerData = async (labelsData: object) => {
  if (!isLabelsDataFactoryValid(labelsData)) throw 'data is invalid'

  const badgeItems: badgeItem[] = []
  console.log(labelsData)
  labelsData.forEach((el: { type: badgeType; value: number }) => {
    badgeItems.push({ type: el.type, amount: el.value })
  })
  await api.put(badgeItems)
}
