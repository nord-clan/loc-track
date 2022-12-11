import { useContext } from 'react';
import { CanvasStoreContext } from '../../components/canvas/diagram/diagram-context';
import { CanvasStore } from '../../components/canvas/store/canvas.store';

export const useCanvasStore = () => useContext(CanvasStoreContext) as CanvasStore;
