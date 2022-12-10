import { useContext } from 'react';
import { CanvasStoreContext } from '../../components/canvas/diagram/diagram-context';

export const useCanvasStore = () => useContext(CanvasStoreContext);
