import { useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { useRootStore } from '../store/useRootStore';
import { useWheelHandler } from './useWheelHandler';
import { useDragHandlers } from './useDragHandlers';
import { usePinchHandlers } from './usePinchHandlers';
import { useResizeAction } from '../events/useResizeAction';

export const useDiagramInteraction = () => {
  const store = useRootStore();
  const { diagramState, diagramSettings } = store;

  const cancelGesture = useCallback(
    (event: { target: EventTarget | null }) => event.target !== diagramState.ref.current,
    [diagramState.ref]
  );

  const pinchHandlers = usePinchHandlers(cancelGesture);
  const dragHandlers = useDragHandlers(cancelGesture);
  const wheelHandler = useWheelHandler(diagramState);

  useResizeAction(diagramState.ref.recalculateSizeAndPosition, [store]);

  useGesture(
    {
      ...pinchHandlers,
      ...dragHandlers,
      ...wheelHandler,
      onContextMenu: ({ event }) => event.preventDefault()
    },
    {
      target: diagramState.ref,
      eventOptions: { passive: false },
      enabled: !diagramSettings.userInteraction.arePointerInteractionsDisabled
    }
  );
};
