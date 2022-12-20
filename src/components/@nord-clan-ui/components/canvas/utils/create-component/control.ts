import type { CornerPosition } from '../../../../helpers/position';
import type { RootStore } from '../../store/root.store';
import type { IVisualComponent } from '../../store/visual-component/visual-component-state.store';
import { Control } from '../../ui/control/control';
import { createComponent } from './creator';

export type IControlProps = IVisualComponent<IControlComponentProps<IControlSettings>>;

export const createDefaultControl = (settings?: Partial<IControlSettings>) => {
  return createComponent(Control, defaultSettings, settings);
};

export function getOffsetStyles(settings: IControlSettings) {
  return {
    top:
      settings.position === 'left-top' || settings.position === 'right-top'
        ? settings.parentOffset
        : undefined,
    right:
      settings.position === 'right-bottom' || settings.position === 'right-top'
        ? settings.parentOffset
        : undefined,
    bottom:
      settings.position === 'left-bottom' || settings.position === 'right-bottom'
        ? settings.parentOffset
        : undefined,
    left:
      settings.position === 'left-top' || settings.position === 'left-bottom'
        ? settings.parentOffset
        : undefined
  };
}

interface IButtonsValue {
  zoomIn?: boolean;
  zoomOut?: boolean;
  deleteSelection?: boolean;
  cloneSelectedNodes?: boolean;
  zoomToFit?: boolean;
  lockUnlockPointerInteractions?: boolean;
}

export interface IControlSettings {
  classes?: string[];
  style?: React.CSSProperties;
  position?: CornerPosition;
  buttons: IButtonsValue;
  buttonsSize: number;
  parentOffset?: number;
}

export const defaultSettings: IControlSettings = {
  position: 'left-bottom',
  buttonsSize: 30,
  buttons: {
    zoomIn: true,
    zoomOut: true,
    deleteSelection: true,
    cloneSelectedNodes: true,
    zoomToFit: true,
    lockUnlockPointerInteractions: true
  },
  parentOffset: 20
};

export interface IControlComponentProps<TSettings = unknown> {
  store: RootStore;
  settings?: TSettings;
}
