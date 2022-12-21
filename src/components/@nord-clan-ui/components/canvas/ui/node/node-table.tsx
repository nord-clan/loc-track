import type { INodeDefaultSettings } from '../../store/node/node.interface';
import type { INodeProps } from '../../utils/create-component/node';
import { NodeTableStyled } from './styles';
import { observer } from 'mobx-react-lite';

export const NodeTable: INodeProps = observer((props) => {
  const { entity, settings } = props;
  const { InnerNode } = settings as INodeDefaultSettings;

  return <NodeTableStyled> </NodeTableStyled>;
});
