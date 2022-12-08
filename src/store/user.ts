import { makeAutoObservable } from 'mobx';

export interface IUserModel {
  username: string;
  avatar: string;
  introduce: string;
}

export default class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  master: Partial<IUserModel> | null = null;

  setUser(model: IUserModel) {
    this.master = model;
  }

  get username() {
    return this.master?.username || '';
  }

  get introduce() {
    return this.master?.introduce || null;
  }
}
