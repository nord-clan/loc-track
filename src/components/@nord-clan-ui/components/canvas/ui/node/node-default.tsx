import type { FC } from 'react';
import type { INodeVisualComponentProps } from '../../store/node/node-settings.store';
import type { INodeDefaultSettings } from '../../store/node/node.interface';
import { NodeDefaultStyled } from './styles';
import { observer } from 'mobx-react-lite';
import { Tooltip } from '#/@nord-clan';

export const NodeDefault: FC<INodeVisualComponentProps<INodeDefaultSettings>> = observer(
  (props) => {
    const { entity, settings } = props;
    const { InnerNode } = settings as INodeDefaultSettings;

    return (
      <Tooltip title="test" placement="top">
        <NodeDefaultStyled>{InnerNode && <InnerNode node={entity} />}</NodeDefaultStyled>
      </Tooltip>
    );
  }
);
