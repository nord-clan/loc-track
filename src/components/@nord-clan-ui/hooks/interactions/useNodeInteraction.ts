import type { GestureHandlers } from '@use-gesture/react';
import type { NodeState } from '../../components/canvas/store/node/node-state.store';
import { useCallback, useMemo, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { useRootStore } from '../store/useRootStore';
import { canDragGestureBeTapInstead, eventPathContainsClass } from './common';
import { multiplyPoint } from '../../helpers/point';
import { useCursor, useDiagramCursor } from './useCursor';
import useEventListener from '../events/useEventListener';

export const useNodeInteraction = (nodeState: NodeState) => {
  const store = useRootStore();

  const interactionActiveRef = useRef<boolean>(false);
  const selectOnLongTapRef = useRef<NodeJS.Timeout | null>(null);
  const cancelSelectOnLongTap = useCallback(() => {
    if (selectOnLongTapRef.current) {
      clearTimeout(selectOnLongTapRef.current);
      selectOnLongTapRef.current = null;
      return true;
    }
    return false;
  }, [selectOnLongTapRef]);
  const startedDragRef = useRef<boolean>(false);

  const handlers = useMemo<GestureHandlers>(
    () => ({
      onPointerEnter: () => {
        nodeState.hovered = true;
      },
      onPointerLeave: () => {
        nodeState.hovered = false;
      },
      onClick: () => {}, // Prevent from double tap zooming on IOS
      onDrag: ({ pinching, delta, movement, cancel }) => {
        if (!interactionActiveRef.current || pinching || canDragGestureBeTapInstead(movement)) {
          return;
        }
        cancelSelectOnLongTap();

        if (
          !nodeState.isDragEnabled ||
          // If there is another node that activated dragging
          (store.dragState.isActive && !startedDragRef.current)
        ) {
          interactionActiveRef.current = false;
          cancel();
          return;
        }

        // If somehow node was unselected during dragging. It can be connecting ports while dragging nodes,
        // or dropped node for example
        if (store.dragState.isActive && !nodeState.isDragActive && startedDragRef.current) {
          store.dragState.stopDragging();
          startedDragRef.current = false;
          interactionActiveRef.current = false;
          cancel();
          return;
        }

        if (!nodeState.isDragActive) {
          startedDragRef.current = store.dragState.startDragging(nodeState);
        }

        store.dragState.dragBy(multiplyPoint(delta, 1 / store.diagramState.zoom));
      },
      onDragStart: ({ event, cancel }) => {
        interactionActiveRef.current = allowNodeInteraction(event) && !store.dragState.isActive;

        if (interactionActiveRef.current) {
          cancelSelectOnLongTap();
          if (nodeState.isSelectionEnabled) {
            selectOnLongTapRef.current = global.setTimeout(() => {
              if (selectOnLongTapRef.current) {
                selectOnLongTapRef.current = null;
                // It can happen if user simultaneously tap two nodes and will start move one of them
                if (!store.dragState.isActive) {
                  store.selectionState.switch(nodeState);
                }
              }
            }, selectDelay);
          }
        } else {
          cancel();
        }
      },
      onDragEnd: ({ tap, shiftKey, altKey, ctrlKey, metaKey }) => {
        if (interactionActiveRef.current) {
          interactionActiveRef.current = false;
          const selectLongOnTapCancelled = cancelSelectOnLongTap();

          if (startedDragRef.current) {
            store.dragState.stopDragging();
            startedDragRef.current = false;
          }

          // selectLongOnTapCancelled means that callback in timer wasn't executed yet
          if (nodeState.isSelectionEnabled && tap && selectLongOnTapCancelled) {
            store.selectionState.switch(
              nodeState,
              !store.diagramSettings.userInteraction.isCallbackMultiselectionActivated(
                shiftKey,
                altKey,
                ctrlKey,
                metaKey
              )
            );
          }
        }
      },
      onContextMenu: ({ event }) => {
        event.preventDefault();
        const { x, y } = event;
        store.diagramState.setClickPosition([x, y]);
        store.diagramState.toggleContextMenuVisible(true);
      }
    }),
    [nodeState, store]
  );

  const handleHideContextMenu = useCallback(
    () => store.diagramState.toggleContextMenuVisible(false),
    []
  );

  useEventListener('mousedown', handleHideContextMenu);
  useEventListener('wheel', handleHideContextMenu);

  useGesture(handlers, {
    target: nodeState.ref,
    eventOptions: { passive: false },
    enabled: !store.diagramSettings.userInteraction.arePointerInteractionsDisabled
  });

  useDiagramCursor(nodeState.isDragActive, 'move');
  useCursor(nodeState.isDragActive, 'move', nodeState.ref.current);
};

const selectDelay = 500;

function allowNodeInteraction(event: PointerEvent | TouchEvent | MouseEvent | KeyboardEvent) {
  return eventPathContainsClass(
    event,
    ENABLE_NODE_USER_INTERACTION_CLASS,
    DISABLE_NODE_USER_INTERACTION_CLASS
  );
}

export const ENABLE_NODE_USER_INTERACTION_CLASS = 'enable_node_user_interaction';
export const DISABLE_NODE_USER_INTERACTION_CLASS = 'disable_node_user_interaction';
