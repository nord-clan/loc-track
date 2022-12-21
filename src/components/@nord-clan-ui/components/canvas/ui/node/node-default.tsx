import type { INodeDefaultSettings } from '../../store/node/node.interface';
import type { INodeProps } from '../../utils/create-component/node';
import { NodeDefaultStyled } from './styles';
import { observer } from 'mobx-react-lite';
import { Tooltip } from '#/@nord-clan';

export const NodeDefault: INodeProps = observer((props) => {
  const { entity, settings } = props;
  const { InnerNode } = settings as INodeDefaultSettings;

  return (
    <Tooltip title="test" placement="top">
      <NodeDefaultStyled>{InnerNode && <InnerNode node={entity} />}</NodeDefaultStyled>
    </Tooltip>
  );
});
