import type { FC } from 'react';
import type { INodeVisualComponentProps } from '../store/node/node-settings.store';
import type { INodeDefaultSettings } from '../store/node/node.interface';
import { NodeDefaultStyled } from './node-default.style';
import { observer } from 'mobx-react-lite';

export const NodeDefault: FC<INodeVisualComponentProps<INodeDefaultSettings>> = observer(
  (props) => {
    const { entity, settings } = props;
    const { InnerNode } = settings as INodeDefaultSettings;

    return <NodeDefaultStyled>{InnerNode && <InnerNode node={entity} />}</NodeDefaultStyled>;
  }
);
