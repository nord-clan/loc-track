import type { UrlObject } from 'url';

export declare enum LayoutType {
  Page,
  Home,
  Project,
  Custom
}

export interface IMenuModel {
  title: string;
  type?: keyof typeof LayoutType;
  path: string;
  subMenu?: IMenuModel[];
  icon?: JSX.Element | string;
  as?: string | UrlObject;
  independent?: boolean;
}

export interface IViewportRecord {
  w: number;
  h: number;
  mobile: boolean;
  pad: boolean;
  hpad: boolean;
  wider: boolean;
  widest: boolean;
}

export interface IScrollRecord {
  dir: 'up' | 'down' | null;
  pos: number;
}
