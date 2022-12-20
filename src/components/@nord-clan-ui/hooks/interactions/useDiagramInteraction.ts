import { useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { useCanvasStore } from '../store/useRootStore';
import { useDiagramWheelHandler } from './useDiagramWheelHandler';
import { useDiagramDragHandlers } from './useDiagramDragHandlers';
import { useDiagramPinchHandlers } from './useDiagramPinchHandlers';
import { useDiagramContextMenu } from './useDiagramContextMenu';
import { useResizeAction } from '../events/useResizeAction';

export const useDiagramInteraction = () => {
  const store = useCanvasStore();
  const { diagramState, diagramSettings } = store;

  const cancelGesture = useCallback(
    (event: { target: EventTarget | null }) => event.target !== diagramState.ref.current,
    [diagramState.ref]
  );

  const pinchHandlers = useDiagramPinchHandlers(cancelGesture);
  const dragHandlers = useDiagramDragHandlers(cancelGesture);
  const wheelHandler = useDiagramWheelHandler(diagramState);
  const contextHandler = useDiagramContextMenu(diagramState);

  useResizeAction(diagramState.ref.recalculateSizeAndPosition, [store]);

  useGesture(
    {
      ...pinchHandlers,
      ...dragHandlers,
      ...wheelHandler,
      ...contextHandler
    },
    {
      target: diagramState.ref,
      eventOptions: { passive: false },
      enabled: !diagramSettings.userInteraction.arePointerInteractionsDisabled
    }
  );
};
