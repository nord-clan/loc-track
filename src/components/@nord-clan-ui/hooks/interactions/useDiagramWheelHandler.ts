import type { check, IInteractionTranslateAndZoom } from './common';
import type { EventTypes, Handler } from '@use-gesture/react';
import { useMemo } from 'react';
import { useCanvasStore } from '../store/useRootStore';
import { subtractPoints } from '../../helpers/point';

export function useDiagramWheelHandler(state: IInteractionTranslateAndZoom): IWheelHandler {
  const store = useCanvasStore();
  const { diagramState, diagramSettings } = store;

  const handlers = useMemo<IWheelHandler>(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onWheel: ({ direction: [_, yDirection], event }) => {
        if (!diagramState.ref.current || !diagramSettings.userInteraction.diagramZoom) return;
        event?.preventDefault();
        const rect = diagramState.ref.current.getBoundingClientRect();

        const mousePositionOnElement = subtractPoints(
          [event.clientX, event.clientY],
          [rect.left, rect.top]
        );

        let factor = 0.9;
        if (yDirection < 0) {
          factor = 1 / factor;
        }

        state.translateAndZoomInto([0, 0], mousePositionOnElement, factor);
      }
    }),
    [diagramState.ref, state, diagramSettings]
  );

  return handlers;
}

type WheelEventHandler = Handler<'wheel', check<EventTypes, 'wheel'>>;

interface IWheelHandler {
  onWheel: WheelEventHandler;
}
