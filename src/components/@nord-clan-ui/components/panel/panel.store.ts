import type { ISide } from './panel.style';
import { BaseDialogStore } from '../dialog/dialog.store';

export interface IPanelStoreParams {
  side?: ISide;
  delay?: number;
  width?: string;
  isNotAnimate?: boolean;
}

export class PanelStore extends BaseDialogStore {
  private params?: IPanelStoreParams;

  constructor(params?: IPanelStoreParams) {
    super(params);
    this.params = params;
  }

  hide = () => this.setIsVisible(false);
  show = () => this.setIsVisible(true);

  get isNotAnimate(): boolean {
    return !!this.params?.isNotAnimate;
  }

  get side(): ISide {
    return this.params?.side ?? 'left';
  }

  get width(): string {
    return this.params?.width ?? '300px';
  }
}
