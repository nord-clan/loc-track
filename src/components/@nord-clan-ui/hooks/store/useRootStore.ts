import type { RootStore } from '../../components/canvas/store/root.store';
import { useContext } from 'react';
import { RootStoreContext } from '../../components/canvas/ui/diagram/diagram-context';

export const useRootStore = () => useContext(RootStoreContext) as RootStore;
