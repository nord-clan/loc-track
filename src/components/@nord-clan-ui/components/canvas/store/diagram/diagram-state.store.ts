/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type {
  IInteractionTranslate,
  IInteractionTranslateAndZoom
} from '../../../../hooks/interactions/common';
import type { IPoint } from '../../../../helpers/point';
import type { RootStore } from '../root.store';
import type { BoundingBox } from '../../../../helpers/index';
import { addPoints, multiplyPoint, subtractPoints } from '../../../../helpers/point';
import { HtmlElement } from '../../ui/html-element';
import { clampValue, deepCopy } from '../../../../helpers/index';
import { makeAutoObservable } from 'mobx';

export class DiagramStateStore implements IInteractionTranslateAndZoom, IInteractionTranslate {
  private _clickPosition: IPoint;
  private _isContextMenuVisible = false;

  private _zoom: number;
  private _offset: IPoint;
  private _ref: HtmlElement;
  private _store: RootStore;

  private _renderImportedRequestId = -1;

  constructor(store: RootStore) {
    this._ref = new HtmlElement(null, this);
    this._store = store;
    this.import();

    makeAutoObservable<DiagramStateStore, '_store'>(this, {
      _store: false
    });
  }

  import = (state?: IDiagramState) => {
    this.setOffset(state?.offset);
    this.setZoom(state?.zoom);
  };

  export = (): IDiagramState =>
    deepCopy({
      offset: this._offset,
      zoom: this._zoom
    });

  reportWhenImportedStateRendered = () => {
    this._renderImportedRequestId += 1;
  };

  get renderImportedRequestId() {
    return this._renderImportedRequestId;
  }

  zoomIn = () => this.zoomIntoCenter(1 / 0.8);
  zoomOut = () => this.zoomIntoCenter(0.8);

  setClickPosition = (newPosition: IPoint | null | undefined) => {
    this._clickPosition = newPosition ?? [0, 0];
  };

  toggleContextMenuVisible = (isVisible: boolean) => {
    this._isContextMenuVisible = isVisible;
  };

  setOffset = (newOffset: IPoint | null | undefined) => {
    this._offset = newOffset ?? [0, 0];
  };

  setZoom = (newZoom: number | null | undefined) => {
    this._zoom = clampValue(newZoom ?? 1, this._store.diagramSettings.zoomInterval);
  };

  setTransformation = (newOffset: IPoint, newZoom: number) => {
    this.setOffset(newOffset);
    this.setZoom(newZoom);
  };

  zoomInto = (pointToZoomInto: IPoint, zoomMultiplicator: number) => {
    const newZoom = clampValue(
      this._zoom * zoomMultiplicator,
      this._store.diagramSettings.zoomInterval
    );

    const pointDisplacementAfterZoom = multiplyPoint(
      subtractPoints(pointToZoomInto, this._offset),
      newZoom / this._zoom
    );

    this.setTransformation(subtractPoints(pointToZoomInto, pointDisplacementAfterZoom), newZoom);
  };

  translate = (translateBy: IPoint) => {
    this.setOffset(addPoints(this._offset, translateBy));
  };

  translateAndZoomInto = (
    translateBy: IPoint,
    pointToZoomInto: IPoint,
    zoomMultiplicator: number
  ) => {
    this.translate(translateBy);
    this.zoomInto(pointToZoomInto, zoomMultiplicator);
  };

  zoomIntoCenter = (zoomMultiplicator: number) => {
    if (this.ref.boundingRect) {
      this.zoomInto(multiplyPoint(this.ref.boundingRect.size, 0.5), zoomMultiplicator);
    }
  };

  get ref() {
    return this._ref;
  }

  get offset() {
    return this._offset;
  }

  get zoom() {
    return this._zoom;
  }

  get isContextMenuVisible() {
    return this._isContextMenuVisible;
  }

  get clickPosition() {
    return this._clickPosition;
  }

  getRenderedZoom(): number | null {
    const attr = this.ref.getDataAttribute('data-zoom');
    return attr ? Number(attr) : null;
  }

  /**
   * Get position on Diagram in its coordinates system (including zoom) by mouse/touch position.
   * @param pointerPosition position of mouse or finger on the screen
   */
  getPositionByPointer = (pointerPosition: IPoint): IPoint => {
    const diagRect = this.ref.current?.getBoundingClientRect();
    if (diagRect) {
      return multiplyPoint(
        subtractPoints(pointerPosition, [diagRect.left, diagRect.top], this.offset),
        1 / this.zoom
      );
    }
    return [0, 0];
  };

  zoomToFit = () => {
    const nodesBoundingBox = this._getNodesBoundingBoxWithPadding();

    const diagramSize = this.ref.boundingRect?.size;
    if (!diagramSize) {
      console.warn('Cannot retrieve diagram size');
      return;
    }

    const newZoom = clampValue(
      calculateNewZoomToFitBoundingBox(diagramSize, nodesBoundingBox),
      this._store.diagramSettings.zoomToFitSettings.zoomInterval
    );
    this.setZoom(newZoom);

    this.setOffset(calculateOffsetToCenterBoundingBox(diagramSize, newZoom, nodesBoundingBox));
  };

  private _getNodesBoundingBoxWithPadding = (): BoundingBox => {
    const nodesBoundingBox = this._store.node.getNodesBoundingBox();
    const { padding } = this._store.diagramSettings.zoomToFitSettings;
    nodesBoundingBox.topLeftCorner = subtractPoints(nodesBoundingBox.topLeftCorner, padding);
    nodesBoundingBox.bottomRightCorner = addPoints(nodesBoundingBox.bottomRightCorner, padding);
    nodesBoundingBox.size = subtractPoints(
      nodesBoundingBox.bottomRightCorner,
      nodesBoundingBox.topLeftCorner
    );

    return nodesBoundingBox;
  };
}

function calculateNewZoomToFitBoundingBox(diagramSize: IPoint, boundingBox: BoundingBox) {
  // Zoom to fit the largest size, horizontal or vertical
  const newZoom = Math.min(
    diagramSize[0] / boundingBox.size[0],
    diagramSize[1] / boundingBox.size[1]
  );
  return newZoom;
}

function calculateOffsetToCenterBoundingBox(
  diagramSize: IPoint,
  zoom: number,
  boundingBox: BoundingBox
) {
  // Take zoom into account
  const contentSizeWithZoom = multiplyPoint(boundingBox.size, zoom);
  const topLeftCornerWithZoom = multiplyPoint(boundingBox.topLeftCorner, zoom);
  const diffBetweenDiagramAndContentSizes = subtractPoints(diagramSize, contentSizeWithZoom);
  return addPoints(
    multiplyPoint(topLeftCornerWithZoom, -1), // topLeft corner of content will be at topleft corner of diagram
    multiplyPoint(diffBetweenDiagramAndContentSizes, 1 / 2) // center content
  );
}

export interface IDiagramState {
  offset: IPoint;
  zoom: number;
}
