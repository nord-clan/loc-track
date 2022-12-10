export type Point = [number, number];

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
