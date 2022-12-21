import type { IPoint } from '../../../../helpers/point';
import type { NodeVarious } from '../../utils/create-component/node';
import type { IVisualComponent } from '../visual-component/visual-component-state.store';
import type { NodeState } from './node-state.store';

export interface INodeStateWithoutId {
  label?: string;
  position: IPoint;
  type?: NodeVarious;
  data?: unknown;
  isSelectionEnabled?: boolean;
  isDragEnabled?: boolean;
}

export interface INodeStateWithId extends INodeStateWithoutId {
  id: string;
}

export interface INodeExport extends INodeStateWithId {
  id: string;
}

export interface INodeState extends INodeStateWithoutId {
  id?: string;
}

export interface INodeStateDiff {
  label?: string | null;
  position?: IPoint;
  type?: NodeVarious;
  data?: unknown;
  isSelectionEnabled?: boolean;
  isDragEnabled?: boolean;
}

export interface INodeDefaultSettings {
  idk?: unknown;
  InnerNode?: IVisualComponent<{ node: NodeState }>;
  removeDefaultClasses?: true;
  classes?: NodeDefaultSettingsByStates<string[]>;
  style?: NodeDefaultSettingsByStates<React.CSSProperties>;
}

export type NodeDefaultState = 'base' | 'hovered' | 'selected' | 'selected-hovered';
export type NodeDefaultSettingsByStates<TValue> = {
  [key in NodeDefaultState]?: TValue;
};
