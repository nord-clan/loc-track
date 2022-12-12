import AppStore from './app';
import UserStore from './user';
import { BasePanelStore } from '../components/@nord-clan-ui/components/panel/panel.store';

export interface IRootStore {
  appStore: AppStore;
  userStore: UserStore;
  leftPanelStore: BasePanelStore;
  rightPanelStore: BasePanelStore;
}
export class IRootStore {
  constructor() {
    this.appStore = new AppStore();
    this.userStore = new UserStore();
    this.leftPanelStore = new BasePanelStore({ side: 'left' });
    this.rightPanelStore = new BasePanelStore({ side: 'right' });
  }
}
