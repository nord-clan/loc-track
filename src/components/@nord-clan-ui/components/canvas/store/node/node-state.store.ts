import type { IPoint } from '../../../../helpers/point';
import type { RootStore } from '../root.store';
import type { PropertyChange } from '../callbacks/callbacks.store';
import { NodeVarious } from '../../utils/create-component/node';
import { makeAutoObservable, reaction } from 'mobx';
import { addPoints, arePointsEqual } from '../../../../helpers/point';
import { HtmlElement } from '../../ui/html-element';
import { deepCopy, isBoolean } from '../../../../helpers/index';
import { generateTransform } from '../../../../helpers/transformation';

export class NodeState {
  private _id: string;
  private _label?: string;
  private _position: IPoint;
  private _ref: HtmlElement;
  private _type?: NodeVarious;
  private _selected: boolean;
  private _hovered: boolean;
  private _data?: unknown;
  private _isSelectionEnabled?: boolean;
  private _isDragEnabled?: boolean;
  private _isDragActive: boolean;
  private _store: RootStore;

  constructor(store: RootStore, id: string, state?: INodeStateWithoutId) {
    this._store = store;

    this._id = id;
    this._ref = new HtmlElement(null, store.diagramState);
    this._selected = false;
    this._hovered = false;
    this._isDragActive = false;
    this.import(state);

    makeAutoObservable(this);

    reaction(
      () => [this._id, this._label, this._data, this._type],
      () => {
        this._ref.recalculateSizeAndPosition();
      }
    );
  }

  import = (newState?: INodeStateWithoutId) => {
    this._setPosition(newState?.position ?? [0, 0]);
    this._setType(newState?.type);
    this._setData(newState?.data);
    this._setLabel(newState?.label);
    this._setIsSelectionEnabled(newState?.isSelectionEnabled);
    this._setIsDragEnabled(newState?.isDragEnabled);
  };

  export = (): INodeExport => ({
    ...deepCopy({
      id: this._id,
      label: this._label,
      position: this._position,
      type: this._type,
      data: this._data,
      isSelectionEnabled: this._isSelectionEnabled ?? undefined,
      isDragEnabled: this._isDragEnabled ?? undefined
    })
  });

  get position() {
    return this._position;
  }

  get id() {
    return this._id;
  }

  get label() {
    return this._label;
  }

  get ref() {
    return this._ref;
  }

  get type(): string {
    return this._type ?? NodeVarious.Defafult;
  }

  get componentDefinition() {
    const { visualComponents } = this._store.nodeSettings;
    return visualComponents.getComponent(this.type);
  }

  setLabel = (value?: string | null): PropertyChange<string | undefined> | undefined => {
    const change = this._setLabel(value);

    if (change) {
      this._store.callbacks.nodeLabelChanged(this, change);
    }

    return change;
  };

  private _setLabel = (value?: string | null): PropertyChange<string | undefined> | undefined => {
    const valueToSet = value ?? undefined;
    if (this._label === valueToSet) {
      return undefined;
    }
    const oldValue = this._label;
    this._label = valueToSet;
    return {
      oldValue,
      newValue: this._label
    };
  };

  /**
   * @param newPosition - new position
   * @param ignoreSnapping - do not take into account snapping to grid
   * @returns `undefined` if position did not change
   */
  setPosition = (
    newPosition: IPoint,
    ignoreSnapping = false
  ): PropertyChange<IPoint> | undefined => {
    const change = this._setPosition(newPosition, ignoreSnapping);

    if (change) {
      this._store.callbacks.nodePositionChanged(this, change);
    }

    return change;
  };

  private _setPosition = (
    newPosition: IPoint,
    ignoreSnapping = false
  ): PropertyChange<IPoint> | undefined => {
    const snap = this._store.nodeSettings.gridSnap;
    if (!ignoreSnapping && snap) {
      newPosition = [snapPosition(newPosition[0], snap[0]), snapPosition(newPosition[1], snap[1])];
    }

    if (!arePointsEqual(newPosition, this._position)) {
      const oldPos = this._position;
      this._position = newPosition;

      return {
        oldValue: oldPos,
        newValue: this._position
      };
    }
    return undefined;
  };

  /**
   * @param vector - vector to move node by
   * @param ignoreSnapping - do not take into account snapping to grid
   * @returns remainder in case snap to grid is turned on. For example if vector
   * would be [3,9], node current position [10,10] and snap [5,5],
   * the node position would be set to [10,15] and remainder equals [3,4]
   */
  moveBy = (vector: IPoint, ignoreSnapping = false): IPoint | undefined => {
    let newPos = addPoints(this.position, vector);
    let remainder: IPoint | undefined;
    const snap = this._store.nodeSettings.gridSnap;

    if (!ignoreSnapping && snap) {
      const res1 = snapMoveByVector(this.position[0], vector[0], snap[0]);
      const res2 = snapMoveByVector(this.position[1], vector[1], snap[1]);
      remainder = [res1.remainder, res2.remainder];
      newPos = [res1.value, res2.value];
    }

    this.setPosition(newPos, true);
    return remainder;
  };

  setType = (
    value: NodeVarious | null | undefined
  ): PropertyChange<string | undefined> | undefined => {
    const change = this._setType(value);

    if (change) {
      this._store.callbacks.nodeTypeChanged(this, change);
    }

    return change;
  };

  private _setType = (
    value: NodeVarious | null | undefined
  ): PropertyChange<string | undefined> | undefined => {
    const valueToSet = value ?? undefined;
    if (this._type === valueToSet) {
      return undefined;
    }
    const oldValue = this._type;
    this._type = valueToSet;
    return {
      oldValue,
      newValue: this._type
    };
  };

  get hovered() {
    return this._hovered;
  }

  set hovered(value: boolean) {
    this._hovered = value;
  }

  get data() {
    return this._data;
  }

  setData = (value?: unknown): PropertyChange<unknown> | undefined => {
    const change = this._setData(value);

    if (change) {
      this._store.callbacks.nodeDataChanged(this, change);
    }

    return change;
  };

  private _setData = (value?: unknown): PropertyChange<unknown> | undefined => {
    if (this._data === value) {
      return undefined;
    }
    const oldValue = this._data;
    this._data = value ?? undefined;
    return {
      oldValue,
      newValue: this._data
    };
  };

  get transformString() {
    return generateTransform(this._position);
  }

  get selected() {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
    if (!value) {
      this.isDragActive = false;
    }
  }

  get isSelectionEnabled(): boolean {
    return this._isSelectionEnabled === undefined
      ? this._store.diagramSettings.userInteraction.nodeSelection
      : this._isSelectionEnabled;
  }

  setIsSelectionEnabled = (
    value: boolean | null | undefined
  ): PropertyChange<boolean | undefined> | undefined => {
    const change = this._setIsSelectionEnabled(value);

    if (change) {
      this._store.callbacks.nodeIsSelectionEnabledChanged(this, change);
    }

    return change;
  };

  private _setIsSelectionEnabled = (
    value: boolean | null | undefined
  ): PropertyChange<boolean | undefined> | undefined => {
    const valueToSet = isBoolean(value) ? value : undefined;
    if (this._isSelectionEnabled === valueToSet) {
      return undefined;
    }

    const oldValue = this._isSelectionEnabled;
    this._isSelectionEnabled = !!valueToSet;
    return {
      oldValue,
      newValue: this._isSelectionEnabled
    };
  };

  get isDragEnabled(): boolean {
    return (
      (this._isDragEnabled === undefined
        ? this._store.diagramSettings.userInteraction.nodeDrag
        : this._isDragEnabled) && this.isSelectionEnabled
    );
  }

  setIsDragEnabled = (
    value: boolean | null | undefined
  ): PropertyChange<boolean | undefined> | undefined => {
    const change = this._setIsDragEnabled(value);

    if (change) {
      this._store.callbacks.nodeIsDragEnabledChanged(this, change);
    }

    return change;
  };

  private _setIsDragEnabled = (
    value: boolean | null | undefined
  ): PropertyChange<boolean | undefined> | undefined => {
    const valueToSet = isBoolean(value) ? value : undefined;
    if (this._isDragEnabled === valueToSet) {
      return undefined;
    }

    const oldValue = this._isDragEnabled;
    this._isDragEnabled = valueToSet;
    return {
      oldValue,
      newValue: this._isDragEnabled
    };
  };

  get isDragActive() {
    return this._isDragActive;
  }

  set isDragActive(value) {
    if (this._isDragActive !== value) {
      this._isDragActive = value;
    }
  }
}

function snapPosition(pos: number, snap: number) {
  const mod = pos % snap;
  if (Math.abs(mod) > snap / 2) return pos + snap * Math.sign(mod) - mod;
  return pos - mod;
}

function snapMoveByVector(pos: number, vec: number, snapValue: number) {
  if (vec === 0) return { value: pos, remainder: 0 };

  let result = 0;
  const desiredPos = pos + vec;

  let frac = Math.trunc(desiredPos / snapValue);
  if ((vec < 0 && desiredPos > 0) || (vec > 0 && desiredPos < 0)) {
    frac += 1 * Math.sign(desiredPos);
  }
  // eslint-disable-next-line no-compare-neg-zero
  if (frac === -0) frac = 0;

  result = frac * snapValue;

  if ((vec < 0 && result > pos) || (vec > 0 && result < pos)) {
    return { value: pos, remainder: vec };
  }
  return { value: result, remainder: pos - result + vec };
}

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
  data?: unknown;
  isSelectionEnabled?: boolean;
  isDragEnabled?: boolean;
}
