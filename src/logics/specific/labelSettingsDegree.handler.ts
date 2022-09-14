import { scoreApi } from '../../resources/api/score';
import { score } from '../../core/types/score.type';

const api = scoreApi();

export const initPageHandler = async (): Promise<score> => {
  const res = await api.get();
  const score = res.data;
  const errors = res.errors;

  if (Object.is(errors, null)) return score;
  else {
    return { amount: 0, isActive: false, type: null, unit: 0 };
  }
};

export const changeServerDataHandler = async (data: score) => {
  await api.put(data);
};
