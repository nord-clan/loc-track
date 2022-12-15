import type { Props as IHoverProps } from '@floating-ui/react/src/hooks/useHover';
import type { Props as IFocusProps } from '@floating-ui/react/src/hooks/useFocus';
import type { Props as IDismissProps } from '@floating-ui/react/src/hooks/useDismiss';
import type { Props as IRoleProps } from '@floating-ui/react/src/hooks/useRole';
import type { Placement } from '@floating-ui/react';
import type { ITooltipProps } from './tooltip';
import { makeAutoObservable, action, makeObservable } from 'mobx';

type ITooltipParams = Omit<ITooltipProps, 'controllerRef'>;

export interface ITooltipSettings {
  hoverProps?: IHoverProps;
  focusProps?: IFocusProps;
  dismissProps?: IDismissProps;
  roleProps?: IRoleProps;
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
  offset: number;
  placement: Placement;
  settings: ITooltipSettings = {
    hoverProps: {
      move: false
    },
    roleProps: {
      role: 'tooltip'
    }
  };
  state: ITooltipState;

  constructor(props: ITooltipParams) {
    const { title, settings, placement, offset } = props;

    this.placement = placement ?? 'top';
    this.offset = offset ?? 5;
    this.settings = {
      ...this.settings,
      ...settings
    };

    this.state = {
      title,
      isVisible: false
    };

    makeAutoObservable(this.state);
    makeObservable(this, {
      setTitle: action,
      setIsVisible: action
    });
  }

  setIsVisible = (isVisible: boolean): boolean => (this.state.isVisible = isVisible);

  setTitle = (title: string): void => {
    this.state.title = title;
  };

  get stateGetter(): ITooltipState {
    return {
      ...this.state
    };
  }

  //* --- Controllers ------------------------------------------------ * //
  controller: ITooltipController = {
    setTitle: (title: string) => this.setTitle(title),
    setIsVisible: (isVisible: boolean) => this.setIsVisible(isVisible),
    getState: () => this.stateGetter
  };
}
