import type { FC } from 'react';
import type { NodeState } from '../../store/node/node-state.store';
import { observer } from 'mobx-react-lite';
import { createContext } from 'react';
import { NodeWrapperStyled } from './styles';

export const NodeWrapper: FC<{ node: NodeState }> = observer(({ node }) => {
  const {
    id,
    position,
    ref,
    componentDefinition: { Component, settings }
  } = node;

  // TODO
  // useNodeInteraction(node);

  return (
    <NodeContext.Provider value={node}>
      <NodeWrapperStyled position={position} id={id} ref={ref}>
        <Component entity={node} settings={settings} />
      </NodeWrapperStyled>
    </NodeContext.Provider>
  );
});

export const NodeContext = createContext<NodeState | null>(null);
