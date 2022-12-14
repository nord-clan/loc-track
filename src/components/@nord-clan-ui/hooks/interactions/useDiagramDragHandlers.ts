import type { EventTypes, Handler } from '@use-gesture/react';
import type { check } from './common';
import { useMemo } from 'react';
import { useCanvasStore } from '../store/useRootStore';
import { addPoints } from '../../helpers/point';
import { useNotifyRef } from '../events/useNotifyRef';
import { useDiagramCursor } from './useCursor';

type DragEventHandler = Handler<'drag', check<EventTypes, 'drag'>>;

export interface IDragHandlers {
  onDrag: DragEventHandler;
  onDragStart: DragEventHandler;
  onDragEnd: DragEventHandler;
}

export function useDiagramDragHandlers(
  cancelEvent: (event: { target: EventTarget | null }) => boolean
): IDragHandlers {
  const store = useCanvasStore();
  const { diagramState, diagramSettings } = store;

  const activeRef = useNotifyRef(false);
  const handlers = useMemo<IDragHandlers>(
    () => ({
      onDrag: ({ pinching, delta }) => {
        if (!activeRef.current || pinching) return;
        diagramState.setOffset(addPoints(diagramState.offset, delta));
      },
      onDragStart: ({ event, cancel }) => {
        if (cancelEvent(event)) {
          cancel();
          return;
        }
        if (!diagramSettings.userInteraction.diagramPan) return;
        if ((event as MouseEvent).buttons !== 1) return;
        activeRef.current = true;
      },
      onDragEnd: ({ tap }) => {
        if (activeRef.current) {
          if (tap) {
            // console.log('tap');
          }
          activeRef.current = false;
        }
      }
    }),
    [activeRef, diagramState, cancelEvent, store]
  );

  useDiagramCursor(activeRef.current, 'grabbing');

  return handlers;
}
