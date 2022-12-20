import type {
  IComponentDefinition,
  IVisualComponent
} from '../visual-component/visual-component-state.store';
import type { IPoint } from '../../../../helpers/point';
import type { IUserInteraction } from '../interaction-settings.store';
import type { IBackgroundComponentProps } from '../../utils/create-component/background';
import type { IControlComponentProps } from '../../utils/create-component/control';
import type { IContextMenuComponentProps } from '../../utils/create-component/context-menu';
import { createDefaultContextMenu } from '../../utils/create-component/context-menu';
import { createDefaultControl } from '../../utils/create-component/control';
import { makeAutoObservable } from 'mobx';
import { InteractionSettingsStore } from '../interaction-settings.store';
import { VisualComponentWithDefault as VisualComponent } from '../visual-component/visual-component-with-default.store';
import { createDefaultBackground } from '../../utils/create-component/background';

export class DiagramSettingsStore {
  private _userInteraction: InteractionSettingsStore;

  private _backgroundComponentState: VisualComponent<IBackgroundComponentProps>;
  private _controlComponentState: VisualComponent<IControlComponentProps>;
  private _contextMenuComponentState: VisualComponent<IContextMenuComponentProps>;

  private _zoomInterval: IPoint = defaultZoomInterval;
  private _zoomToFitSettings: IZoomToFitSettings = defaultZoomToFitSettings;

  constructor() {
    this._userInteraction = new InteractionSettingsStore();

    this._backgroundComponentState = new VisualComponent(createDefaultBackground());
    this._controlComponentState = new VisualComponent(createDefaultControl());
    this._contextMenuComponentState = new VisualComponent(createDefaultContextMenu());

    makeAutoObservable(this);
  }

  import = (obj?: IDiagramSettings) => {
    this._userInteraction.import(obj?.userInteraction);

    if (this._backgroundComponentState && this._controlComponentState) {
      this._backgroundComponentState.import(obj?.backgroundComponent);
      this._controlComponentState.import(obj?.controlComponent);
      this.setZoomInterval(obj?.zoomInterval);
    }

    this._contextMenuComponentState.import(obj?.contextMenuComponent);

    this._zoomToFitSettings = {
      ...defaultZoomToFitSettings,
      ...obj?.zoomToFitSettings
    };
  };

  get userInteraction() {
    return this._userInteraction;
  }

  get backgroundComponentState() {
    return this._backgroundComponentState;
  }

  get controlComponentState() {
    return this._controlComponentState;
  }

  get contextMenuComponentState() {
    return this._contextMenuComponentState;
  }

  get zoomInterval() {
    return this._zoomInterval;
  }

  get zoomToFitSettings() {
    return this._zoomToFitSettings;
  }

  setZoomInterval = (value: IPoint | null | undefined) => {
    this._zoomInterval = value ?? defaultZoomInterval;
  };
}

//* --- Default --- *//

const defaultZoomInterval: IPoint = [0.1, 3];
const defaultZoomToFitSettings: IZoomToFitSettings = {
  padding: [30, 30],
  zoomInterval: [0.1, 1.5],
  callOnImportState: true
};

//* --- Interfaces --- *//

export interface IDiagramSettings {
  userInteraction?: Partial<IUserInteraction>;

  backgroundComponent?: IComponent<IBackgroundComponentProps>;
  controlComponent?: IComponent<IControlComponentProps>;
  contextMenuComponent?: IComponent<IContextMenuComponentProps>;

  zoomInterval?: IPoint;
  zoomToFitSettings?: Partial<IZoomToFitSettings>;
}

type IComponent<TComponentProps> =
  | IComponentDefinition<TComponentProps, unknown>
  | IVisualComponent<TComponentProps>;

export interface IZoomToFitSettings {
  padding: IPoint;
  zoomInterval: IPoint;
  callOnImportState: boolean;
}
