import type React from 'react';
import { useEffect, useRef } from 'react';
import { useCanvasStore } from '../store/useRootStore';

export function useCursor(
  active: boolean,
  cursor: React.CSSProperties['cursor'],
  ref: HTMLDivElement | null
) {
  const cursorBeforeSetRef = useRef<string>('');

  useEffect(() => {
    if (!active || !ref || !cursor || ref.style.cursor === cursor) {
      return;
    }

    cursorBeforeSetRef.current = ref.style.cursor;
    ref.style.cursor = cursor;

    return () => {
      ref.style.cursor = cursorBeforeSetRef.current;
    };
  }, [active, ref]);
}

export function useDiagramCursor(active: boolean, cursor: React.CSSProperties['cursor']) {
  const { diagramState } = useCanvasStore();
  const ref = diagramState.ref.current;

  useCursor(active, cursor, ref);
}
