import { labelsType } from '../../presentation/factory/specific/labelSettings/labelSettingsLabelsData.factory'
import { badge } from '../../core/types/badge.type'

const destructLabelsDataValue = (labelsData: object): badge => {
  let golden: number | undefined = 0
  let silver: number | undefined = 0
  let bronze: number | undefined = 0

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  labelsData.value.forEach((el) => {
    switch (el.type) {
      case labelsType.GOLDEN:
        golden = el.value
        break
      case labelsType.SILVER:
        silver = el.value
        break
      case labelsType.BRONZE:
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

// export const initHandler = () => {}

export const validateAndChangeServerData = async (labelsData: object) => {
  if (isLabelsDataFactoryValid(labelsData)) await 0
}