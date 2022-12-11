import type { CanvasStore } from '../canvas.store';
import type {
  IComponentDefinition,
  VisualComponent
} from '../visual-component/visual-component-state.store';
import type { Point } from '../../../../helpers/point';
import type { IUserInteraction } from '../interaction-settings.store';
import { makeAutoObservable } from 'mobx';
import { createSvgBackground } from '../../background/background-svg';
import { InteractionSettingsStore } from '../interaction-settings.store';
import { VisualComponentWithDefault } from '../visual-component/visual-component-with-default.store';
import { createDefaultControl } from '../../control/control-default';

export class DiagramSettingsStore {
  private _backgroundComponentState: VisualComponentWithDefault<IBackgroundComponentProps>;
  private _controlComponentState: VisualComponentWithDefault<IControlComponentProps>;
  private _zoomInterval: Point = defaultZoomInterval;
  private _zoomToFitSettings: IZoomToFitSettings = defaultZoomToFitSettings;
  private _userInteraction: InteractionSettingsStore;

  constructor() {
    this._backgroundComponentState = new VisualComponentWithDefault<IBackgroundComponentProps>(
      createSvgBackground()
    );
    this._userInteraction = new InteractionSettingsStore();
    this._controlComponentState = new VisualComponentWithDefault<IControlComponentProps>(
      createDefaultControl()
    );
    makeAutoObservable(this);
  }

  import = (obj?: IDiagramSettings) => {
    if (this._backgroundComponentState && this._controlComponentState) {
      this._backgroundComponentState.import(obj?.backgroundComponent);
      this._controlComponentState.import(obj?.controlComponent);
      this.setZoomInterval(obj?.zoomInterval);
    }

    this._zoomToFitSettings = {
      ...defaultZoomToFitSettings,
      ...obj?.zoomToFitSettings
    };
    this._userInteraction.import(obj?.userInteraction);
  };

  get backgroundComponentState() {
    return this._backgroundComponentState;
  }

  get miniControlComponentState() {
    return this._controlComponentState;
  }

  get zoomInterval() {
    return this._zoomInterval;
  }

  get zoomToFitSettings() {
    return this._zoomToFitSettings;
  }

  get userInteraction() {
    return this._userInteraction;
  }

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
  controlComponent?:
    | IComponentDefinition<IControlComponentProps, unknown>
    | VisualComponent<IControlComponentProps>;
  zoomInterval?: Point;
  zoomToFitSettings?: Partial<IZoomToFitSettings>;
  userInteraction?: Partial<IUserInteraction>;
}

export interface IBackgroundComponentProps<TSettings = unknown> {
  diagramOffset: Point;
  diagramZoom: number;
  settings?: TSettings;
}

export interface IControlComponentProps<TSettings = unknown> {
  canvasStore: CanvasStore;
  settings?: TSettings;
}

export interface IZoomToFitSettings {
  padding: Point;
  zoomInterval: Point;
  callOnImportState: boolean;
}
