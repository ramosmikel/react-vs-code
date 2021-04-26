import { createSelector } from 'reselect';
import { RootState } from '@/lib/types';

const getOpenTabsHandler = ({ openTabs }: RootState) => openTabs;

export const getOpenTabs = createSelector([getOpenTabsHandler], state => state);
