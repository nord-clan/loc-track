import AppStore from './app';
import UserStore from './user';

export interface IRootStore {
  appStore: AppStore;
  userStore: UserStore;
}
export class IRootStore {
  constructor() {
    this.appStore = new AppStore();
    this.userStore = new UserStore();
  }
}
