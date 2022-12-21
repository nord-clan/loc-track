import type { IComponentDefinition, IVisualComponent } from './visual-component-state.store';
import { makeAutoObservable } from 'mobx';
import { VisualComponentState } from './visual-component-state.store';

export class VisualComponentWithDefault<TComponentProps> {
  private _innerComponent: VisualComponentState<TComponentProps, unknown>;
  private _defaultComponent: VisualComponentState<TComponentProps, unknown>;

  constructor(defaultComponent: IComponentDefinition<TComponentProps, unknown>) {
    this._innerComponent = new VisualComponentState<TComponentProps, unknown>(defaultComponent);
    this._defaultComponent = this._innerComponent;
    makeAutoObservable(this);
  }

  get Component() {
    return this._innerComponent.Component;
  }

  get settings() {
    return this._innerComponent.settings;
  }

  import = (
    newComponent?:
      | IComponentDefinition<TComponentProps, unknown>
      | IVisualComponent<TComponentProps>
  ) => {
    this._innerComponent = newComponent
      ? new VisualComponentState<TComponentProps, unknown>(newComponent)
      : this._defaultComponent;
  };
}
