import React from 'react';
import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useCanvasStore } from '../../../hooks/store/useRootStore';
import { NodeWrapper } from './node-wrapper';
import { NodesLayerStyled } from './nodes-layer.style';

export const NodesLayer: FC<{ transform: string }> = observer(({ transform }) => {
  return (
    <NodesLayerStyled style={{ transform }}>
      <NodesList />
    </NodesLayerStyled>
  );
});

const NodesList: FC = observer(() => {
  const { nodeStore } = useCanvasStore();

  return (
    <>
      {Array.from(nodeStore.nodes).map(([, node]) => (
        <NodeWrapper key={node.id} node={node} />
      ))}
    </>
  );
});
