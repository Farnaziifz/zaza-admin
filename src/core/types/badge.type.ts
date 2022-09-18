import { badgeType } from '../enums/badgeType.enum'

export type badgeValues = {
  gold: number
  silver: number
  bronze: number
}

export type badgeItem = {
  type: badgeType
  amount: number | undefined
}

export type badgePresentationData = {
  value: undefined | number
  title: string | undefined
  type: badgeType
  outlineColor: string
  backgroundColor: string
  textColor: string
}