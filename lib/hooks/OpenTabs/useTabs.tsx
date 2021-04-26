import { useDispatch } from 'react-redux';
import { closeTab, editTab } from '@/lib/modules/openTabs';
import { switchTab } from '@/lib/modules/sharedActions';
import { Tab } from '@/lib/types';

type Action = 'SWITCH_TAB' | 'EDIT_TAB' | 'CLOSE_TAB';

const useTabs = () => {
  const dispatch = useDispatch();
  return (action: Action, { fileName, isUnsaved }: Partial<Tab>) => {
    switch (action) {
      case 'SWITCH_TAB': {
        dispatch(switchTab({ fileName }));
        break;
      }
      case 'EDIT_TAB': {
        dispatch(editTab({ fileName, isUnsaved }));
        break;
      }
      case 'CLOSE_TAB': {
        dispatch(closeTab({ fileName }));
      }
    }
  };
};

export default useTabs;
