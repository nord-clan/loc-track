import { useGesture } from '@use-gesture/react';
import { useCanvasStore } from '../store/useRootStore';
import { useDiagramWheelHandler } from './useDiagramWheelHandler';
import { useDiagramDragHandlers } from './useDiagramDragHandlers';
import { useCallback } from 'react';

export const useDiagramInteraction = () => {
  const { diagramState, diagramSettings } = useCanvasStore();

  const cancelGesture = useCallback(
    (event: { target: EventTarget | null }) => event.target !== diagramState.ref.current,
    [diagramState.ref]
  );

  // const pinchHandlers = useDiagramPinchHandlers(cancelGesture);
  const dragHandlers = useDiagramDragHandlers(cancelGesture);
  const wheelHandler = useDiagramWheelHandler(diagramState);

  useGesture(
    {
      ...dragHandlers,
      ...wheelHandler
    },
    {
      target: diagramState.ref,
      eventOptions: { passive: false },
      enabled: !diagramSettings.userInteraction.arePointerInteractionsDisabled
    }
  );
};
