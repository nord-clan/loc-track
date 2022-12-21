import type { FC } from 'react';
import type { NodeState } from '../../store/node/node-state.store';
import { observer } from 'mobx-react-lite';
import { NodeLabelStyled } from './styles';

export const NodeLabel: FC<{ node: NodeState }> = observer(({ node }) => {
  const { label, id } = node;

  return <NodeLabelStyled>{label || id}</NodeLabelStyled>;
});
