import type { IVisualComponentsObject } from '../visual-component/visual-components.store';
import type { Point } from '../../../../helpers/point';
import type { NodeState } from './node-state.store';
import type {
  IComponentDefinition,
  IVisualComponentProps
} from '../visual-component/visual-component-state.store';
import {
  COMPONENT_DEFAULT_TYPE,
  VisualComponents
} from '../visual-component/visual-components.store';

import { makeAutoObservable } from 'mobx';
import type { INodeDefaultSettings } from './node.interface';
import { NodeDefault } from '../../node/node-default';
import { NodeLabel } from '../../node/node-label';

export class NodeSettingsStore {
  private _visualComponents: VisualComponents<INodeComponentSettings, INodeVisualComponentProps> =
    new VisualComponents<INodeComponentSettings, INodeVisualComponentProps>({
      [COMPONENT_DEFAULT_TYPE]: this.createNodeDefault()
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

  createNodeDefault(
    settings?: INodeDefaultSettings
  ): IComponentDefinition<INodeVisualComponentProps<INodeDefaultSettings>, INodeDefaultSettings> {
    return {
      Component: NodeDefault,
      settings: {
        InnerNode: NodeLabel,
        ...settings
      }
    };
  }
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
