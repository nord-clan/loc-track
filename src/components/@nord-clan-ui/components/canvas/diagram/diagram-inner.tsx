import type { FC, ReactNode, PropsWithChildren } from 'react';
import { useMemo, useEffect } from 'react';
import { useCanvasStore } from '#/components/@nord-clan-ui/hooks/store/useRootStore';
import { BackgroundWrapper } from '../background/background-wrapper';
import { observer } from 'mobx-react-lite';
import { DigramInnerStyled } from './diagram-inner.style';
import { useDiagramInteraction } from '../../../hooks/interactions/useDiagramInteraction';
import { generateTransform } from '../../../helpers/transformation';
import { NodesLayer } from '../node/nodes-layer';
import { LayoutLayer } from '../layout/layout-layer';

export interface IDiagramInnerProps extends PropsWithChildren {
  diagramStyles?: React.CSSProperties;
  children?: ReactNode | undefined;
}

export const DigramInner: FC<IDiagramInnerProps> = observer((props) => {
  const { children, diagramStyles: style } = props;
  const store = useCanvasStore();
  const { ref } = store.diagramState;

  useDiagramInteraction();

  useResizeAction(() => {
    ref.recalculateSizeAndPosition();
  });

  const { offset, zoom } = store.diagramState;

  const transform = useMemo(() => generateTransform(offset, zoom), [offset]);
  const propsDigramInner = useMemo(() => ({ ref, style, 'data-zoom': zoom }), [zoom]);

  return (
    <DigramInnerStyled {...propsDigramInner}>
      <BackgroundWrapper />
      <LayoutLayer {...{ transform }} />
      <NodesLayer {...{ transform }} />
      {children}
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
