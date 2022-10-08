import { groupQueryTypeEnum } from '../enums/groupQueryTypeEnum'

export type query = {
  type: groupQueryTypeEnum
  from: string | null
  to: string | null
  value: string
}
