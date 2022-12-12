import type { Point } from '../../../../helpers/point';
import type { VisualComponent } from '../visual-component/visual-component-state.store';
import type { NodeState } from './node-state.store';

export interface INodeStateWithoutId {
  label?: string;
  position: Point;
  type?: string;
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
  position?: Point;
  type?: string;
  data?: unknown;
  isSelectionEnabled?: boolean;
  isDragEnabled?: boolean;
}

export interface INodeDefaultSettings {
  idk?: unknown;
  InnerNode?: VisualComponent<{ node: NodeState }>;
  removeDefaultClasses?: true;
  classes?: NodeDefaultSettingsByStates<string[]>;
  style?: NodeDefaultSettingsByStates<React.CSSProperties>;
}

export type NodeDefaultState = 'base' | 'hovered' | 'selected' | 'selected-hovered';
export type NodeDefaultSettingsByStates<TValue> = {
  [key in NodeDefaultState]?: TValue;
};
