import { degreeType } from '../enums/degreeType.enum'

export type degree = {
  type: degreeType | undefined
  value: number
  amount: number
  isActive: boolean
}

export type degreeLabelOverallStatistics = {
  goldPercentage: number
  silverPercentage: number
  bronzePercentage: number
}