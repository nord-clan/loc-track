import { makeAutoObservable } from 'mobx';
import { NodeState } from '../node/node-state.store';

export class SelectionStateStore {
  private _selectedItems = new Set<ISelectableItem>();

  constructor() {
    makeAutoObservable(this);
  }

  get selectedItems(): ISelectableItem[] {
    return Array.from(this._selectedItems);
  }

  get selectedNodes(): NodeState[] {
    return this.selectedItems.filter((i) => i instanceof NodeState);
  }

  select = (item: ISelectableItem, unselectOther = false): boolean => {
    if (unselectOther) this.unselectAll();

    if (!this._selectedItems.has(item)) {
      item.selected = true;
      this._selectedItems.add(item);
      return true;
    }
    return false;
  };

  switch = (item: ISelectableItem, unselectOtherOnSelection = false) => {
    if (item.selected) {
      this.unselect(item);
    } else {
      this.select(item, unselectOtherOnSelection);
    }
  };

  unselect = (item: ISelectableItem): boolean => {
    if (this._selectedItems.has(item)) {
      item.selected = false;
      this._selectedItems.delete(item);
      return true;
    }
    return false;
  };

  unselectAll = () => {
    this._selectedItems.forEach((i) => (i.selected = false));
    this._selectedItems.clear();
  };

  unselectItems = (itemsToClear: Readonly<ISelectableItem[]>) => {
    itemsToClear.forEach((i) => this.unselect(i));
  };
}

export type ISelectableItem = NodeState;
