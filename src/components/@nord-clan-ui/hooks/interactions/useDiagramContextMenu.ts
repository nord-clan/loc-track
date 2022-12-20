import type { EventTypes, Handler, SharedGestureState } from '@use-gesture/react';
import type { DiagramStateStore } from '../../components/canvas/store/diagram/diagram-state.store';
import type { check } from './common';
import { useCallback, useMemo } from 'react';
import useEventListener from '../events/useEventListener';

export function useDiagramContextMenu(state: DiagramStateStore) {
  const { toggleContextMenuVisible, setClickPosition } = state;

  const handlers = useMemo<IContextHandler>(
    () => ({
      onContextMenu: ({ event }) => {
        event.preventDefault();
        const { x, y } = event;
        setClickPosition([x, y]);
        toggleContextMenuVisible(true);
      }
    }),
    []
  );

  const handleHideContextMenu = useCallback(() => toggleContextMenuVisible(false), []);

  useEventListener('click', handleHideContextMenu);
  useEventListener('wheel', handleHideContextMenu);

  return handlers;
}

interface IContextHandler {
  onContextMenu:
    | ((
        state: SharedGestureState & {
          event: MouseEvent;
          args: unknown;
        },
        ...args: unknown[]
      ) => void)
    | undefined;
}
