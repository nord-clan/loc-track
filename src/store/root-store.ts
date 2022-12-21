import AppStore from './app.store';
import UserStore from './user.store';
import { PanelStore, SearchStore } from '#/@nord-clan';

export interface IRootStore {
  appStore: AppStore;
  userStore: UserStore;
  rightPanelStore: PanelStore;
  searchStore: SearchStore;
}
export class IRootStore {
  constructor() {
    this.appStore = new AppStore();
    this.userStore = new UserStore();
    this.rightPanelStore = new PanelStore({ side: 'right', width: '360px' });
    this.searchStore = new SearchStore({ name: 'searchStore' });
  }
}
