import type { IVisualComponentsObject } from '../visual-component/visual-components.store';
import type { Point } from '../../../../helpers/point';
import type { NodeState } from './node-state.store';
import type { IVisualComponentProps } from '../visual-component/visual-component-state.store';
import {
  COMPONENT_DEFAULT_TYPE,
  VisualComponents
} from '../visual-component/visual-components.store';

import { makeAutoObservable } from 'mobx';
import { createNode } from './node-default';

export class NodeSettings {
  private _visualComponents: VisualComponents<INodeComponentSettings, INodeVisualComponentProps> =
    new VisualComponents<INodeComponentSettings, INodeVisualComponentProps>({
      [COMPONENT_DEFAULT_TYPE]: createNode()
    });
  private _gridSnap: Point | null;
  constructor() {
    this.setGridSnap();
    makeAutoObservable(this);
  }

  get visualComponents() {
    return this._visualComponents;
  }

  import = (obj?: INodesSettings) => {
    this._visualComponents.import(obj);
    this.setGridSnap(obj?.gridSnap);
  };

  get gridSnap() {
    return this._gridSnap;
  }

  setGridSnap = (gridSnap?: number | Point) => {
    if (!gridSnap) {
      this._gridSnap = null;
    } else if (typeof gridSnap === 'number') {
      this._gridSnap = [gridSnap, gridSnap];
    } else if (Array.isArray(gridSnap) && gridSnap.length === 2) {
      this._gridSnap = gridSnap;
    }
  };
}

export interface INodeComponentSettings {
  idk?: unknown;
}

export type INodeVisualComponentProps<
  TSettings extends INodeComponentSettings = INodeComponentSettings
> = IVisualComponentProps<NodeState, TSettings>;

export interface INodesSettings
  extends IVisualComponentsObject<
    INodeComponentSettings,
    INodeVisualComponentProps<INodeComponentSettings>
  > {
  gridSnap?: number | Point;
}
