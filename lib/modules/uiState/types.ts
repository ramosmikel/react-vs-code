import { UIStateNames, UIStateExtras } from '@/lib/types';

export interface ShowArgs {
  uiStateName: UIStateNames;
  extras?: UIStateExtras;
}
