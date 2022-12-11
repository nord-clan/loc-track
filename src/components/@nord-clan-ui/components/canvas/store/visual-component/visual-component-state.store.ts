import { action, computed, makeObservable, observable } from 'mobx';

export class VisualComponentState<TComponentProps, TSettings> {
  private _component: VisualComponent<TComponentProps>;
  private _settings: TSettings | null = null;

  constructor(
    component: IComponentDefinition<TComponentProps, TSettings> | VisualComponent<TComponentProps>
  ) {
    this.import(component);
    makeObservable<VisualComponentState<TComponentProps, TSettings>, '_component' | '_settings'>(
      this,
      {
        _component: observable.ref,
        _settings: observable.ref,
        Component: computed,
        settings: computed,
        import: action
      }
    );
  }

  import = (
    newComponent:
      | IComponentDefinition<TComponentProps, TSettings>
      | VisualComponent<TComponentProps>
  ) => {
    if ('component' in newComponent) {
      const _newComponent = newComponent as IComponentDefinition<TComponentProps, TSettings>;
      this._component = _newComponent.Component;
      this._settings = _newComponent.settings ?? null;
    } else {
      const _newComponent = newComponent as VisualComponent<TComponentProps>;
      this._component = _newComponent;
      this._settings = null;
    }
  };

  get Component() {
    return this._component;
  }

  get settings() {
    return this._settings;
  }
}

export interface IVisualComponentProps<TEntity, TSettings> {
  entity: TEntity;
  settings: TSettings | null;
}

export type VisualComponent<TComponentProps> = React.FunctionComponent<TComponentProps>;

export interface IComponentDefinition<TComponentProps, TSettings> {
  Component: VisualComponent<TComponentProps>;
  settings?: TSettings;
}