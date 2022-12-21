import type { IVisualComponentsObject } from '../visual-component/visual-components.store';
import type { IPoint } from '../../../../helpers/point';
import type { NodeState } from './node-state.store';
import type { IVisualComponentProps } from '../visual-component/visual-component-state.store';
import {
  COMPONENT_DEFAULT_TYPE,
  VisualComponents
} from '../visual-component/visual-components.store';
import { makeAutoObservable } from 'mobx';
import { createDefaultNode, createTableNode, NodeVarious } from '../../utils/create-component/node';

export class NodeSettingsStore {
  private _visualComponents: VisualComponents<INodeComponentSettings, INodeVisualComponentProps> =
    new VisualComponents<INodeComponentSettings, INodeVisualComponentProps>({
      [COMPONENT_DEFAULT_TYPE]: createDefaultNode(),
      [NodeVarious.Table]: createTableNode()
    });
  private _gridSnap: IPoint | null;
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

  setGridSnap = (gridSnap?: number | IPoint) => {
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
  gridSnap?: number | IPoint;
}
