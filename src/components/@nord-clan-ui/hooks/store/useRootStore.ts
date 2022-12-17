import type { CanvasStore } from '../../components/canvas/store/canvas.store';
import { useContext } from 'react';
import { CanvasStoreContext } from '../../components/canvas/ui/diagram/diagram-context';

export const useCanvasStore = () => useContext(CanvasStoreContext) as CanvasStore;
