import type { Point } from '../node/node.interface';
import type { CanvasStore } from './canvas.store';
import type { IComponentDefinition, VisualComponent } from './visual-component-state.store';
import type { VisualComponentWithDefault } from './visual-component-with-default.store';
import { makeAutoObservable } from 'mobx';

export class DiagramSettings {
  private _backgroundComponentState: VisualComponentWithDefault<IBackgroundComponentProps> =
    {} as VisualComponentWithDefault<IBackgroundComponentProps>;
  private _miniControlComponentState: VisualComponentWithDefault<IMiniControlComponentProps> =
    {} as VisualComponentWithDefault<IMiniControlComponentProps>;
  private _zoomInterval: Point = defaultZoomInterval;
  private _zoomToFitSettings: IZoomToFitSettings = defaultZoomToFitSettings;
  // private _userInteraction: UserInteractionSettings;

  constructor() {
    // this._backgroundComponentState = new VisualComponentWithDefault<IBackgroundComponentProps>(
    //   createSvgBackground()
    // );
    // this._miniControlComponentState = new VisualComponentWithDefault<IMiniControlComponentProps>(
    //   createDefaultMiniControl()
    // );
    // this._userInteraction = new UserInteractionSettings();
    makeAutoObservable(this);
  }

  import = (obj?: IDiagramSettings) => {
    if (this._backgroundComponentState && this._miniControlComponentState) {
      this._backgroundComponentState.import(obj?.backgroundComponent);
      this._miniControlComponentState.import(obj?.miniControlComponent);
      this.setZoomInterval(obj?.zoomInterval);
    }

    this._zoomToFitSettings = {
      ...defaultZoomToFitSettings,
      ...obj?.zoomToFitSettings
    };
    // this._userInteraction.import(obj?.userInteraction);
  };

  get backgroundComponentState() {
    return this._backgroundComponentState;
  }

  get miniControlComponentState() {
    return this._miniControlComponentState;
  }

  get zoomInterval() {
    return this._zoomInterval;
  }

  get zoomToFitSettings() {
    return this._zoomToFitSettings;
  }

  // get userInteraction() {
  //   return this._userInteraction;
  // }

  setZoomInterval = (value: Point | null | undefined) => {
    this._zoomInterval = value ?? defaultZoomInterval;
  };
}

const defaultZoomInterval: Point = [0.1, 3];
const defaultZoomToFitSettings: IZoomToFitSettings = {
  padding: [30, 30],
  zoomInterval: [0.1, 1.5],
  callOnImportState: true
};

export interface IDiagramSettings {
  backgroundComponent?:
    | IComponentDefinition<IBackgroundComponentProps, unknown>
    | VisualComponent<IBackgroundComponentProps>;
  miniControlComponent?:
    | IComponentDefinition<IMiniControlComponentProps, unknown>
    | VisualComponent<IMiniControlComponentProps>;
  zoomInterval?: Point;
  zoomToFitSettings?: Partial<IZoomToFitSettings>;
  // userInteraction?: Partial<IUserInteraction>;
}

export interface IBackgroundComponentProps<TSettings = unknown> {
  diagramOffset: Point;
  diagramZoom: number;
  settings?: TSettings;
}

export interface IMiniControlComponentProps<TSettings = unknown> {
  canvasStore: CanvasStore;
  settings?: TSettings;
}

export interface IZoomToFitSettings {
  padding: Point;
  zoomInterval: Point;
  callOnImportState: boolean;
}
