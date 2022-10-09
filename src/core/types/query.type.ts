import { groupQueryTypeEnum } from '../enums/groupQueryTypeEnum'

export type query = {
  type: groupQueryTypeEnum
  from: string | number | null
  to: string | number | null
  value: string
}
