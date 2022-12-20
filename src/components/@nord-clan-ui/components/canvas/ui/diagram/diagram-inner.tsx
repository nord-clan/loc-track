import type { FC, ReactNode, PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { useRootStore } from '#/components/@nord-clan-ui/hooks/store/useRootStore';
import { BackgroundWrapper } from '../background/background-wrapper';
import { observer } from 'mobx-react-lite';
import { DigramInnerStyled } from './styles';
import { useDiagramInteraction } from '../../../../hooks/interactions/useDiagramInteraction';
import { generateTransform } from '../../../../helpers/transformation';
import { LayoutLayer } from '../layout/layout-layer';
import { NodesLayer } from '../node/nodes-layer';

export interface IDiagramInnerProps extends PropsWithChildren {
  diagramStyles?: React.CSSProperties;
  children?: ReactNode | undefined;
}

export const DigramInner: FC<IDiagramInnerProps> = observer((props) => {
  const { children, diagramStyles: style } = props;
  const store = useRootStore();
  const { ref } = store.diagramState;

  useDiagramInteraction();

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
