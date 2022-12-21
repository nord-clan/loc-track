import AppStore from './app.store';
import UserStore from './user.store';
import { BasePanelStore, SearchStore } from '#/@nord-clan';

export interface IRootStore {
  appStore: AppStore;
  userStore: UserStore;
  leftPanelStore: BasePanelStore;
  rightPanelStore: BasePanelStore;
  searchStore: SearchStore;
}
export class IRootStore {
  constructor() {
    this.appStore = new AppStore();
    this.userStore = new UserStore();
    this.leftPanelStore = new BasePanelStore({ side: 'left' });
    this.rightPanelStore = new BasePanelStore({ side: 'right' });
    this.searchStore = new SearchStore({ name: 'searchStore' });
  }
}
