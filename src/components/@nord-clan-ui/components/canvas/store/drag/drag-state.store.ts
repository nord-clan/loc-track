import type { SelectionStateStore } from '../selection/selection-state.store';
import type { IPoint } from '../../../../helpers/point';
import type { CallbacksStore } from '../callbacks/callbacks.store';
import { addPoints } from '../../../../helpers/point';
import { NodeState } from '../node/node-state.store';
import { makeAutoObservable } from 'mobx';

/**
 * Encapsulate logic for dragging mechanism. Right now only nodes are supposed to be dragged.
 */
export class DragState {
  private _nodesBeingDragged = new Set<NodeState>();
  private _remaindersFromDrags = new Map<string, IPoint | undefined>();

  private _selectionStateStore: SelectionStateStore;
  private _callbacksStore: CallbacksStore;

  constructor(selectionState: SelectionStateStore, callbacks: CallbacksStore) {
    makeAutoObservable(this);
    this._selectionStateStore = selectionState;
    this._callbacksStore = callbacks;
  }
  get isActive() {
    return this._nodesBeingDragged.size !== 0;
  }
  startDragging = (nodeToDrag: NodeState): boolean => {
    if (!nodeToDrag.isDragEnabled || this.isActive) return false;
    if (nodeToDrag.selected) {
      this._selectionStateStore.unselectItems(
        this._selectionStateStore.selectedItems.filter(
          (i) => i instanceof NodeState && !i.isDragEnabled
        )
      );
    } else {
      this._selectionStateStore.unselectAll();
      this._selectionStateStore.select(nodeToDrag);
    }
    this._selectionStateStore.selectedNodes.forEach((n) => {
      n.isDragActive = true;
      this._nodesBeingDragged.add(n);
      // Force snapping to grid to prevent from desynchronized dragging if some of nodes positions were
      // set by ignoring grid
      n.setPosition(n.position);
    });
    this._callbacksStore.dragStarted({
      nodes: this._selectionStateStore.selectedNodes
    });
    return true;
  };
  /**
   * Drag by a difference between previous coordinate and current
   * @param delta vector to drag by which takes into account diagram zoom
   */
  dragBy = (delta: IPoint) => {
    this._nodesBeingDragged.forEach((n) => {
      const vectorWithRemainder = addPoints(delta, this._remaindersFromDrags.get(n.id));
      const newRemainder = n.moveBy(vectorWithRemainder);
      this._remaindersFromDrags.set(n.id, newRemainder);
    });
    this._callbacksStore.drag({
      nodes: this._selectionStateStore.selectedNodes,
      delta
    });
  };
  stopDragging = () => {
    this._nodesBeingDragged.forEach((n) => (n.isDragActive = false));
    this._nodesBeingDragged.clear();
    this._remaindersFromDrags.clear();
    this._callbacksStore.dragEnded({
      nodes: this._selectionStateStore.selectedNodes
    });
  };
}
