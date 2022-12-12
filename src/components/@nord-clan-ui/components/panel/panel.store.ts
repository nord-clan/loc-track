import type { ISide } from './panel.style';
import { action, computed, makeAutoObservable, makeObservable } from 'mobx';

export interface IBasePanelStoreParams {
  side?: ISide;
  delay?: number;
  isNotAnimate?: boolean;
}

interface IBasePanelStoreState {
  isVisible: boolean;
  isLock: boolean;
}

export class BasePanelStore {
  private __params?: IBasePanelStoreParams;

  state = {
    isVisible: false,
    isLock: false
  } as IBasePanelStoreState;

  constructor(params?: IBasePanelStoreParams) {
    this.__params = params;

    makeObservable(this, {
      setIsVisible: action,
      setIsLock: action,
      isDialogHidden: computed
    });

    makeAutoObservable(this.state);
  }

  setIsVisible = (isVisible: boolean): boolean => (this.state.isVisible = isVisible);

  setIsLock = (isLock: boolean): boolean => (this.state.isLock = isLock);

  private lockDialog = (): void => {
    this.setIsLock(true);
    const delay = !this.isNotAnimate ? this.__params?.delay ?? 250 : 0;

    setTimeout(() => {
      this.setIsLock(false);
      this.setIsVisible(false);
    }, delay);
  };

  _show = (): void => {
    this.setIsVisible(true);
  };

  _hide = (withoutLock?: boolean): void => {
    if (withoutLock) {
      this.setIsVisible(false);
    } else {
      this.lockDialog();
    }
  };

  switchVisible = (): boolean => this.setIsVisible(this.isDialogHidden);

  get isDialogHidden(): boolean {
    return !this.state.isLock && !this.state.isVisible;
  }

  get isNotAnimate(): boolean {
    return !!this.__params?.isNotAnimate;
  }

  get side(): ISide {
    return this.__params?.side ?? 'left';
  }
}
