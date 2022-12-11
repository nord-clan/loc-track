import type { FC } from 'react';
import type { NodeState } from '../store/node/node-state.store';
import { observer } from 'mobx-react-lite';
import { createContext } from 'react';
import { NodeWrapperStyled } from './node-wrapper.style';

export const NodeWrapper: FC<{ node: NodeState }> = observer(({ node }) => {
  const {
    componentDefinition: { Component, settings }
  } = node;

  // TODO
  // useNodeInteraction(node);

  return (
    <NodeContext.Provider value={node}>
      <NodeWrapperStyled
        id={node.id}
        style={{
          transform: `translate(${node.position[0]}px, ${node.position[1]}px)`
        }}
        ref={node.ref}>
        <Component entity={node} settings={settings} />
      </NodeWrapperStyled>
    </NodeContext.Provider>
  );
});

export const NodeContext = createContext<NodeState | null>(null);
