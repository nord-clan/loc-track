import { makeAutoObservable, action, makeObservable } from 'mobx';

export interface IPopoverState {
  isVisible: boolean;
}

export interface IPopoverController {
  setIsVisible: (isVisible: boolean) => boolean;
  getState: () => IPopoverState;
}

//* --- Store --------------------------------------------------------- *//
export class PopoverStore {
  state: IPopoverState;

  constructor() {
    this.state = {
      isVisible: false
    };

    makeAutoObservable(this.state);
    makeObservable(this, {
      setIsVisible: action
    });
  }

  setIsVisible = (isVisible: boolean): boolean => (this.state.isVisible = isVisible);

  get stateGetter(): IPopoverState {
    return {
      ...this.state
    };
  }

  //* --- Controllers ------------------------------------------------ * //
  controller: IPopoverController = {
    setIsVisible: (isVisible: boolean) => this.setIsVisible(isVisible),
    getState: () => this.stateGetter
  };
}
