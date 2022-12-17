import type { SharedGestureState } from '@use-gesture/react';
import { useMemo } from 'react';
import { useCanvasStore } from '../store/useRootStore';

export function useContextMenu() {
  const store = useCanvasStore();

  const handlers = useMemo<IContextHandler>(
    () => ({
      onContextMenu: ({ event }) => {
        event.preventDefault();
      }
    }),
    []
  );

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
