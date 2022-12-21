import { useEffect } from 'react';

export function useResizeAction<THandlerReturn, TDeps>(
  handler: () => THandlerReturn,
  dependencies: TDeps[] = []
) {
  useEffect(() => {
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [...dependencies, handler]);
}
