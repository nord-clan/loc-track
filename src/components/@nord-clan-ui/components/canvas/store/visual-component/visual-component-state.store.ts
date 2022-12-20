import { action, computed, makeObservable, observable } from 'mobx';

export class VisualComponentState<TComponentProps, TSettings> {
  private _component: IVisualComponent<TComponentProps>;
  private _settings: TSettings | null = null;

  constructor(
    component: IComponentDefinition<TComponentProps, TSettings> | IVisualComponent<TComponentProps>
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
      | IVisualComponent<TComponentProps>
  ) => {
    const _newComponent = newComponent as IComponentDefinition<TComponentProps, TSettings>;
    this._component = _newComponent.Component;
    this._settings = _newComponent.settings ?? null;

    // if ('Сomponent' in newComponent) {
    //   const _newComponent = newComponent as IComponentDefinition<TComponentProps, TSettings>;
    //   this._component = _newComponent.Component;
    //   this._settings = _newComponent.settings ?? null;
    // } else {
    //   const _newComponent = newComponent as VisualComponent<TComponentProps>;
    //   this._component = _newComponent;
    //   this._settings = null;
    // }
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

export type IVisualComponent<TComponentProps> = React.FunctionComponent<TComponentProps>;

export interface IComponentDefinition<TComponentProps, TSettings> {
  Component: IVisualComponent<TComponentProps>;
  settings?: TSettings;
}
