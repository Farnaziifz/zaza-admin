import { scoreApi } from '@/resources/api/score'
import { score } from '@/core/types/score.type'
import {
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = scoreApi()

export const initHandler = async () => await api.get()

export const changeScoreStatusHandler = async () => {
  showLoadingMessage()
  await api.putStatus()
  showSuccessMessage()
}

export const sendScoreDataToServer = async (scoreData: score) => {
  showLoadingMessage()
  const res = await api.put(scoreData)
  if (res.data) showSuccessMessage()
}