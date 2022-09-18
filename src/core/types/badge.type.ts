import {badgeType} from "../enums/badgeType.enum";

export type badge = {
  golden: number
  silver: number
  bronze: number
}

export type badgeItem = {
  type: badgeType,
  amount: number
}