import type { RootStore } from '../root.store';
import type { NodeState } from '../node/node-state.store';
import type { IPoint } from '../../../../helpers/point';
import type { ErrorResult } from '../../../../helpers/result';
import type { INodeState, INodeExport } from '../node/node.interface';

export class CallbacksStore {
  private _onNodesAddResult?: ICallbacks['onNodesAddResult'];
  private _onNodesRemoveResult?: ICallbacks['onNodesRemoveResult'];
  private _onNodePositionChanged?: ICallbacks['onNodePositionChanged'];
  private _onNodeLabelChanged?: ICallbacks['onNodeLabelChanged'];
  private _onNodeTypeChanged?: ICallbacks['onNodeTypeChanged'];
  private _onNodeDataChanged?: ICallbacks['onNodeDataChanged'];
  private _onNodeIsSelectionEnabledChanged?: ICallbacks['onNodeIsSelectionEnabledChanged'];
  private _onNodeIsDragEnabledChanged?: ICallbacks['onNodeIsDragEnabledChanged'];
  private _onDragStarted?: ICallbacks['onDragStarted'];
  private _onDrag?: ICallbacks['onDrag'];
  private _onDragEnded?: ICallbacks['onDragEnded'];
  private _onImportedStateRendered?: ICallbacks['onImportedStateRendered'];

  private _store: RootStore;

  constructor(store: RootStore) {
    this._store = store;
    this.import();
  }

  import = (callbacks?: ICallbacks) => {
    this._onNodesAddResult = callbacks?.onNodesAddResult;
    this._onNodesRemoveResult = callbacks?.onNodesRemoveResult;
    this._onNodePositionChanged = callbacks?.onNodePositionChanged;
    this._onNodeLabelChanged = callbacks?.onNodeLabelChanged;
    this._onNodeTypeChanged = callbacks?.onNodeTypeChanged;
    this._onNodeDataChanged = callbacks?.onNodeDataChanged;
    this._onNodeIsSelectionEnabledChanged = callbacks?.onNodeIsSelectionEnabledChanged;
    this._onNodeIsDragEnabledChanged = callbacks?.onNodeIsDragEnabledChanged;
    this._onDragStarted = callbacks?.onDragStarted;
    this._onDrag = callbacks?.onDrag;
    this._onDragEnded = callbacks?.onDragEnded;
    this._onImportedStateRendered = callbacks?.onImportedStateRendered;
  };

  export = (): ICallbacks => ({
    onNodesAddResult: this._onNodesAddResult,
    onNodesRemoveResult: this._onNodesRemoveResult,
    onNodePositionChanged: this._onNodePositionChanged,
    onNodeLabelChanged: this._onNodeLabelChanged,
    onNodeTypeChanged: this._onNodeTypeChanged,
    onNodeDataChanged: this._onNodeDataChanged,
    onNodeIsSelectionEnabledChanged: this._onNodeIsSelectionEnabledChanged,
    onNodeIsDragEnabledChanged: this._onNodeIsDragEnabledChanged,
    onDragStarted: this._onDragStarted,
    onDrag: this._onDrag,
    onDragEnded: this._onDragEnded,
    onImportedStateRendered: this._onImportedStateRendered
  });

  nodesAdded = (info: IOnNodesAddResult) => {
    if (
      this._onNodesAddResult &&
      (info.addedNodes.length > 0 || info.failedToAddNodes.length > 0)
    ) {
      this._onNodesAddResult(info, this._store);
    }
  };

  nodesRemoved = (info: IOnNodesRemoveResult) => {
    if (
      this._onNodesRemoveResult &&
      (info.removedNodes.length > 0 || info.failedToRemoveNodeIds.length > 0)
    ) {
      this._onNodesRemoveResult(info, this._store);
    }
  };

  nodePositionChanged = (node: NodeState, change: PropertyChange<IPoint>) => {
    if (this._onNodePositionChanged) {
      this._onNodePositionChanged(
        {
          oldValue: change.oldValue,
          newValue: change.newValue,
          node
        },
        this._store
      );
    }
  };

  nodeTypeChanged = (node: NodeState, change: PropertyChange<string | undefined>) => {
    if (this._onNodeTypeChanged) {
      this._onNodeTypeChanged(
        {
          oldValue: change.oldValue,
          newValue: change.newValue,
          node
        },
        this._store
      );
    }
  };

  nodeLabelChanged = (node: NodeState, change: PropertyChange<string | undefined>) => {
    if (this._onNodeLabelChanged) {
      this._onNodeLabelChanged(
        {
          oldValue: change.oldValue,
          newValue: change.newValue,
          node
        },
        this._store
      );
    }
  };

  nodeDataChanged = (node: NodeState, change: PropertyChange<unknown>) => {
    if (this._onNodeDataChanged) {
      this._onNodeDataChanged(
        {
          oldValue: change.oldValue,
          newValue: change.newValue,
          node
        },
        this._store
      );
    }
  };

  nodeIsSelectionEnabledChanged = (
    node: NodeState,
    change: PropertyChange<boolean | undefined>
  ) => {
    if (this._onNodeIsSelectionEnabledChanged) {
      this._onNodeIsSelectionEnabledChanged(
        {
          oldValue: change.oldValue,
          newValue: change.newValue,
          node
        },
        this._store
      );
    }
  };

  nodeIsDragEnabledChanged = (node: NodeState, change: PropertyChange<boolean | undefined>) => {
    if (this._onNodeIsDragEnabledChanged) {
      this._onNodeIsDragEnabledChanged(
        {
          oldValue: change.oldValue,
          newValue: change.newValue,
          node
        },
        this._store
      );
    }
  };

  dragStarted = (info: IOnDragStarted) => {
    if (this._onDragStarted) {
      this._onDragStarted(info, this._store);
    }
  };

  drag = (info: IOnDrag) => {
    if (this._onDrag) {
      this._onDrag(info, this._store);
    }
  };

  dragEnded = (info: IOnDragEnded) => {
    if (this._onDragEnded) {
      this._onDragEnded(info, this._store);
    }
  };

  importedStateRendered = () => {
    if (this._store.diagramSettings.zoomToFitSettings.callOnImportState) {
      this._store.diagramState.zoomToFit();
    }

    if (this._onImportedStateRendered) {
      this._onImportedStateRendered(this._store);
    }
  };
}

export interface ICallbacks {
  onNodesAddResult?: (info: IOnNodesAddResult, store: RootStore) => void;
  onNodesRemoveResult?: (info: IOnNodesRemoveResult, store: RootStore) => void;
  onNodePositionChanged?: (info: OnNodePositionChanged, store: RootStore) => void;
  onNodeLabelChanged?: (info: OnNodeLabelChanged, store: RootStore) => void;
  onNodeTypeChanged?: (info: OnNodeTypeChanged, store: RootStore) => void;
  onNodeDataChanged?: (info: OnNodeDataChanged, store: RootStore) => void;
  onNodeIsSelectionEnabledChanged?: (
    info: OnNodeIsSelectionEnabledChanged,
    store: RootStore
  ) => void;
  onNodeIsDragEnabledChanged?: (info: OnNodeIsDragEnabledChanged, store: RootStore) => void;
  onDragStarted?: (info: IOnDragStarted, store: RootStore) => void;
  onDrag?: (info: IOnDrag, store: RootStore) => void;
  onDragEnded?: (info: IOnDragEnded, store: RootStore) => void;
  onImportedStateRendered?: (store: RootStore) => void;
}
export interface IOnDragStarted {
  nodes: NodeState[];
}

export interface IOnDrag {
  nodes: NodeState[];
  delta: IPoint;
}

export interface IOnDragEnded {
  nodes: NodeState[];
}

export interface IOnNodePropertyChanged<TValue> extends PropertyChange<TValue> {
  node: NodeState;
}

export type OnNodePositionChanged = IOnNodePropertyChanged<IPoint>;

export type OnNodeLabelChanged = IOnNodePropertyChanged<string | undefined>;

export type OnNodeTypeChanged = IOnNodePropertyChanged<string | undefined>;

export type OnNodeDataChanged = IOnNodePropertyChanged<unknown>;

export type OnNodeIsSelectionEnabledChanged = IOnNodePropertyChanged<boolean | undefined>;

export type OnNodeIsDragEnabledChanged = IOnNodePropertyChanged<boolean | undefined>;

export interface IOnNodesAddResult {
  addedNodes: NodeState[];
  failedToAddNodes: ErrorResult<INodeState>[];
  importing: boolean;
}

export interface IOnNodesRemoveResult {
  removedNodes: INodeExport[];
  failedToRemoveNodeIds: string[];
}

export type PropertyChange<TValue> = {
  oldValue: TValue;
  newValue: TValue;
};

export interface IOnContextMenu {
  removedNodes: INodeExport[];
  failedToRemoveNodeIds: string[];
}

export interface IContextMenu {
  x: number;
  y: number;
}
