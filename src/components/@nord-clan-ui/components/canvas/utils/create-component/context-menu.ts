import type { CanvasStore } from '../../store/canvas.store';
import type { IVisualComponent } from '../../store/visual-component/visual-component-state.store';
import type { IPoint } from '../../../../helpers/point';
import { createComponent } from './creator';
import { ContextMenu } from '../../ui/context-menu/context-menu';

export type IContextMenuProps = IVisualComponent<IContextMenuComponentProps<IContextMenuSettings>>;

export const createDefaultContextMenu = (settings?: Partial<IContextMenuSettings>) => {
  return createComponent(ContextMenu, defaultSettings, settings);
};

export interface IContextMenuSettings {
  position: IPoint;
  isVisible: boolean;
  classes?: string[];
  style?: React.CSSProperties;
  width?: string;
  height?: string;
}

export const defaultSettings: IContextMenuSettings = {
  position: [0, 0],
  isVisible: false,
  width: '100px',
  height: '100px'
};

export interface IContextMenuComponentProps<TSettings = unknown> {
  canvasStore: CanvasStore;
  settings?: TSettings;
}
