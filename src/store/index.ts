import { store, useRootStore } from '#/contexts/root-store';

export const useStore = useRootStore;
export * from './root-store';
export { store };
