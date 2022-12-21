import type { IPoint } from '../../../helpers/point';
import type { DiagramStateStore } from '../store/diagram/diagram-state.store';
import { computed, makeAutoObservable } from 'mobx';
import { multiplyPoint } from '../../../helpers/point';

export class HtmlElement {
  private _diagramState: DiagramStateStore;

  private _currentInternal: HTMLDivElement | null;
  private _triggerSizePositionRecalculation = 0;

  constructor(initValue: HTMLDivElement | null, diagramState: DiagramStateStore) {
    this._currentInternal = initValue;
    makeAutoObservable(this, {
      sizeExcludingZoom: computed({ keepAlive: true }),
      positionExcludingZoom: computed({ keepAlive: true }),
      boundingRect: computed({ keepAlive: true })
    });
    this._diagramState = diagramState;
  }

  get current() {
    return this._currentInternal;
  }

  set current(value: HTMLDivElement | null) {
    this._currentInternal = value;
  }

  /**
   * Size excluding diagram zoom.
   */
  get sizeExcludingZoom(): IPoint | null {
    if (this.boundingRect && this.boundingRect.diagramZoom) {
      return multiplyPoint(this.boundingRect.size, 1 / this.boundingRect.diagramZoom);
    }
    return null;
  }

  /**
   * Position excluding diagram zoom.
   */
  get positionExcludingZoom(): IPoint | null {
    if (this.boundingRect && this.boundingRect.diagramZoom) {
      return multiplyPoint(this.boundingRect.position, 1 / this.boundingRect.diagramZoom);
    }
    return null;
  }

  get boundingRect() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-bitwise
    this._triggerSizePositionRecalculation | 1;
    if (this.current) {
      const rect = this.current.getBoundingClientRect();
      const zoom = this._diagramState.getRenderedZoom();

      return {
        position: [rect.x, rect.y] as IPoint,
        size: [rect.width, rect.height] as IPoint,
        diagramZoom: zoom
      };
    }

    return null;
  }

  getDataAttribute = (name: string): string | null => {
    if (this.current) {
      return this.current.getAttribute(name);
    }

    return null;
  };

  recalculateSizeAndPosition = () => {
    this._triggerSizePositionRecalculation += 1;
  };
}

export interface IHtmlElementRect {
  left: number;
  top: number;
  width: number;
  height: number;
}
