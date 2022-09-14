import { scoreType } from '../enums/scoreType.enum';

export type score = {
  type: string | null | scoreType;
  unit: number;
  amount: number;
  isActive: boolean;
};
