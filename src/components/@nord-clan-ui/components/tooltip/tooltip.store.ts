import type { BasePlacement } from '@popperjs/core';
import { right } from '@popperjs/core';
import { makeAutoObservable, action, makeObservable, observable } from 'mobx';

export interface ITooltipParams {
  title: string;
  delay?: number;
  placement?: BasePlacement;
}

export interface ITooltipState {
  title: string;
  isVisible: boolean;
}

export interface ITooltipController {
  setTitle: (title: string) => void;
  setIsVisible: (isVisible: boolean) => boolean;
  getState: () => ITooltipState;
}

export class TooltipStore {
  props: ITooltipParams;
  state: ITooltipState;
  timeout: number | undefined;

  get stateGetter(): ITooltipState {
    return {
      ...this.state
    };
  }

  controller = {
    setTitle: (title: string) => this.setTitle(title),
    setIsVisible: (isVisible: boolean) => this.setIsVisible(isVisible),
    getState: () => this.stateGetter
  } as ITooltipController;

  constructor(props: ITooltipParams) {
    const { title, delay, placement, ...rest } = props;

    this.props = {
      ...rest,
      title,
      delay: delay ?? 0,
      placement: placement ?? right
    };

    this.state = {
      title,
      isVisible: false
    };

    this.timeout = undefined;

    makeAutoObservable(this.state, {
      isVisible: observable
    });

    makeObservable(this, {
      setTitle: action,
      setIsVisible: action
    });
  }

  show = (): void => {
    this.timeout = window.setTimeout(() => {
      this.setIsVisible(true);
    }, this.props.delay);
  };

  hide = (): void => {
    window.clearTimeout(this.timeout);
    this.timeout = undefined;
    this.setIsVisible(false);
  };

  setIsVisible = (isVisible: boolean): boolean => (this.state.isVisible = isVisible);

  setTitle = (title: string): void => {
    this.state.title = title;
  };
}
