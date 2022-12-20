import type { INodeExport, INodeState } from './node-state.store';
import type { CanvasStore } from '../canvas.store';
import type { BoundingBox } from '../../../../helpers/index';
import type { IPoint } from '../../../../helpers/point';
import type { SuccessOrErrorResult } from '../../../../helpers/result';
import {
  errorValueResult,
  successValueResult,
  isError,
  isSuccess
} from '../../../../helpers/result';
import { NodeState } from './node-state.store';
import { subtractPoints } from '../../../../helpers/point';
import { makeAutoObservable } from 'mobx';
import { v4 } from 'uuid';

export class NodeStore {
  private _nodes = new Map<string, NodeState>();
  private _store: CanvasStore;

  constructor(store: CanvasStore) {
    this._store = store;

    makeAutoObservable(this);
  }

  get nodes(): ReadonlyMap<string, NodeState> {
    return this._nodes;
  }

  import = (newNodes?: INodeState[]) => {
    this._nodes = new Map();
    if (newNodes) {
      const results = this._addNodesInternal(newNodes, false);

      this._store.callbacks.nodesAdded({
        addedNodes: results.filter(isSuccess).map((r) => r.value),
        failedToAddNodes: results.filter(isError),
        importing: true
      });
    }
  };

  export = (): INodeExport[] => Array.from(this._nodes).map(([, value]) => value.export());

  addNodes = (
    nodes: INodeState[],
    rewriteIfExists = false
  ): SuccessOrErrorResult<NodeState, INodeState>[] => {
    const results = this._addNodesInternal(nodes, rewriteIfExists);

    this._store.callbacks.nodesAdded({
      addedNodes: results.filter(isSuccess).map((r) => r.value),
      failedToAddNodes: results.filter(isError),
      importing: false
    });

    return results;
  };

  private _addNodesInternal = (
    nodes: INodeState[],
    rewriteIfExists: boolean
  ): SuccessOrErrorResult<NodeState, INodeState>[] => {
    const results = nodes.map((node) => this._addNodeInternal(node, rewriteIfExists));

    return results;
  };

  addNode = (
    node: INodeState,
    rewriteIfExists = false
  ): SuccessOrErrorResult<NodeState, INodeState> => {
    const result = this._addNodeInternal(node, rewriteIfExists);

    this._store.callbacks.nodesAdded({
      addedNodes: result.success ? [result.value] : [],
      failedToAddNodes: result.success ? [] : [result],
      importing: false
    });

    return result;
  };

  private _addNodeInternal = (
    node: INodeState,
    rewriteIfExists: boolean
  ): SuccessOrErrorResult<NodeState, INodeState> => {
    if (!node) return errorValueResult(node, 'Node object is null or undefined');

    if (!rewriteIfExists && node.id && this._nodes.has(node.id))
      return errorValueResult(node, `Node with id '${node.id}' already exists`);

    const newNode = new NodeState(this._store, node.id ?? v4(), node);
    this._nodes.set(newNode.id, newNode);
    return successValueResult(newNode);
  };

  removeNodes = (nodeIds: string[]): SuccessOrErrorResult<INodeExport, string>[] => {
    if (!Array.isArray(nodeIds) || nodeIds.length === 0) return [];

    const results = nodeIds.map<SuccessOrErrorResult<INodeExport, string>>((id) => {
      const removedNode = this._removeNode(id);
      if (removedNode) return successValueResult(removedNode);
      return errorValueResult(id);
    });

    this._store.callbacks.nodesRemoved({
      removedNodes: results.filter(isSuccess).map((r) => r.value),
      failedToRemoveNodeIds: results.filter(isError).map((r) => r.value)
    });

    return results;
  };

  removeNode = (nodeId: string): INodeExport | undefined => {
    const removedNode = this._removeNode(nodeId);

    this._store.callbacks.nodesRemoved({
      removedNodes: removedNode ? [removedNode] : [],
      failedToRemoveNodeIds: removedNode ? [] : [nodeId]
    });

    return removedNode;
  };

  private _removeNode = (nodeId: string): INodeExport | undefined => {
    const node = this._nodes.get(nodeId);
    if (node) {
      const nodeState = node.export();
      // this._store.linksStore.removeNodeLinks(nodeId);
      // this._store.selectionState.unselect(node);
      this._nodes.delete(nodeId);
      return nodeState;
    }
    return undefined;
  };

  getNode = (nodeId: string): NodeState | undefined => {
    return this._nodes.get(nodeId);
  };

  /**
   * @returns Values are calculated without zoom taking into account, that is, the same as zoom would be '1'
   */
  getNodesBoundingBox = (): BoundingBox => {
    let topLeftCorner: IPoint = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
    let bottomRightCorner: IPoint = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];

    this._nodes.forEach((node) => {
      const pos = node.position;
      const size = node.ref.sizeExcludingZoom ?? [0, 0];

      topLeftCorner = [Math.min(topLeftCorner[0], pos[0]), Math.min(topLeftCorner[1], pos[1])];

      bottomRightCorner = [
        Math.max(bottomRightCorner[0], pos[0] + size[0]),
        Math.max(bottomRightCorner[1], pos[1] + size[1])
      ];
    });

    if (this._nodes.size === 0) {
      topLeftCorner = [0, 0];
      bottomRightCorner = [100, 100];
    }

    return {
      topLeftCorner,
      bottomRightCorner,
      size: subtractPoints(bottomRightCorner, topLeftCorner)
    };
  };
}
