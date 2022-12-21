import type { INodeVisualComponentProps } from '../../store/node/node-settings.store';
import type { INodeDefaultSettings } from '../../store/node/node.interface';
import type { IVisualComponent } from '../../store/visual-component/visual-component-state.store';
import { createComponent } from './creator';

//* Components
import { NodeDefault } from '../../ui/node/node-default';
import { NodeLabel } from '../../ui/node/node-label';
import { NodeTable } from '../../ui/node/node-table';

//* Creators
export const createDefaultNode = (settings?: INodeDefaultSettings) =>
  createComponent(NodeDefault, defaultSettings, settings);

export const createTableNode = (settings?: INodeDefaultSettings) =>
  createComponent(NodeTable, defaultSettings, settings);

export const defaultSettings: INodeDefaultSettings = {
  InnerNode: NodeLabel
};
//* Types
export enum NodeVarious {
  Defafult = 'default',
  Table = 'table'
}

export type INodeProps = IVisualComponent<INodeVisualComponentProps<INodeDefaultSettings>>;
