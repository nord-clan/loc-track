import type { SharedGestureState } from '@use-gesture/react';
import { useEffect, useMemo } from 'react';

export function useContextMenu() {
  const handleContextMenu = (e) => e.preventDefault();

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  const handlers = useMemo<IContextHandler>(
    () => ({
      onContextMenu: (e) => {
        console.log('у', e);
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
