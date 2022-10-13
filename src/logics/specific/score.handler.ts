import { scoreApi } from '@/resources/api/score'
import { score } from '@/core/types/score.type'
import {
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { scoreType } from '@/core/enums/scoreType.enum'

const api = scoreApi()

export const initHandler = async () => await api.get()

export const changeScoreStatusHandler = async () => {
  showLoadingMessage()
  await api.putStatus()
  showSuccessMessage()
}

export const sendScoreDataToServer = async (scoreData: score) => {
  if (scoreData.type === scoreType.PRICE) scoreData.unit *= 10
  await api.put(scoreData)
}
