import { useDispatch } from 'react-redux';
import { show, hide } from '@/lib/modules/uiState';
import { UIStateNames, UIStateExtras } from '@/lib/types';

type Actions = 'SHOW' | 'HIDE';

const useUiState = () => {
  const dispatch = useDispatch();

  return (action: Actions, uiStateName?: UIStateNames, extras?: UIStateExtras) => {
    switch (action) {
      case 'SHOW': {
        dispatch(show({ uiStateName, extras }));
        break;
      }
      case 'HIDE': {
        dispatch(hide());
      }
    }
  };
};

export default useUiState;
