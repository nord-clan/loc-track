import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../hooks/store/useRootStore';
import { NodeWrapper } from './node-wrapper';
import { NodesLayerStyled } from './styles';

export const NodesLayer: FC<{ transform: string }> = observer(({ transform }) => {
  return (
    <NodesLayerStyled style={{ transform }}>
      <NodesList />
    </NodesLayerStyled>
  );
});

const NodesList: FC = observer(() => {
  const { node } = useRootStore();

  return (
    <>
      {Array.from(node.nodes).map(([, n]) => (
        <NodeWrapper key={n.id} node={n} />
      ))}
    </>
  );
});
