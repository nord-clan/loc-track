import { useCanvasStore } from '../store/useRootStore';
import { useDiagramWheelHandler } from './useDiagramWheelHandler';
import { useGesture } from '@use-gesture/react';

export const useDiagramInteraction = () => {
  const { diagramState, diagramSettings } = useCanvasStore();

  // TODO
  // const cancelGesture = useCallback(
  //   (event: { target: EventTarget | null }) => event.target !== diagramState.ref.current,
  //   [diagramState.ref]
  // );

  // const dragHandlers = useDiagramDragHandlers(cancelGesture);
  // const pinchHandlers = useDiagramPinchHandlers(cancelGesture);
  const wheelHandler = useDiagramWheelHandler(diagramState);

  useGesture(
    {
      ...wheelHandler
    },
    {
      target: diagramState.ref,
      eventOptions: { passive: false },
      enabled: !diagramSettings.userInteraction.arePointerInteractionsDisabled
    }
  );
};
