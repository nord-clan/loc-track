import type { FC, ReactNode, PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useCanvasStore } from '#/components/@nord-clan-ui/hooks/store/useRootStore';
import { BackgroundWrapper } from '../background/background-wrapper';
import { observer } from 'mobx-react-lite';
import { DigramInnerStyled } from './diagram-inner.style';
import { useDiagramInteraction } from '../../../hooks/interactions/useDiagramInteraction';
import { deepCopy } from '#/components/@nord-clan-ui/helpers';
import { generateTransform } from '../../../helpers/transformation';
import { ControlWrapper } from '../control/control-wrapper';
// import { NodesLayer } from '../node/nodes-layer';

export interface IDiagramInnerProps extends PropsWithChildren {
  diagramStyles?: React.CSSProperties;
  children?: ReactNode | undefined;
}

export const DigramInner: FC<IDiagramInnerProps> = observer((props) => {
  const { children, diagramStyles } = props;
  const store = useCanvasStore();
  const { ref } = store.diagramState;

  useDiagramInteraction();

  useResizeAction(() => {
    ref.recalculateSizeAndPosition();
  });

  const { offset, zoom } = store.diagramState;
  const transform = generateTransform(offset, zoom);

  console.log('>', transform, deepCopy(offset), deepCopy(zoom));

  return (
    <DigramInnerStyled ref={ref} style={diagramStyles} data-zoom={zoom}>
      <BackgroundWrapper />
      {/* <NodesLayer transform={transform} /> */}
      {children}
      <ControlWrapper />
    </DigramInnerStyled>
  );
});

function useResizeAction(action: () => unknown) {
  const store = useCanvasStore();

  useEffect(() => {
    window.addEventListener('resize', action);
    return () => window.removeEventListener('resize', action);
  }, [store, action]);
}
