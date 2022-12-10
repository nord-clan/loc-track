import { makeAutoObservable } from 'mobx';
import type { IComponentDefinition, VisualComponent } from './visual-component-state.store';
import { VisualComponentState } from './visual-component-state.store';
import type { IDictionary } from '../../../helpers/index';

export class VisualComponents<TSettings, TComponentProps> {
  private _defaultComponents: IDictionary<VisualComponentState<TComponentProps, TSettings>>;
  private _components: IDictionary<VisualComponentState<TComponentProps, TSettings>>;

  constructor(
    defaultComponents: IDictionary<
      IComponentDefinition<TComponentProps, TSettings> | VisualComponent<TComponentProps>
    >
  ) {
    this._defaultComponents = this._createComponentCollection(defaultComponents);
    this._components = { ...this._defaultComponents };
    makeAutoObservable(this);
  }

  import = (obj?: IVisualComponentsObject<TSettings, TComponentProps>) => {
    this._components = {
      ...this._defaultComponents,
      ...this._createComponentCollection(obj?.Components)
    };
  };

  getComponent = (
    type: string | undefined | null
  ): VisualComponentState<TComponentProps, TSettings> => {
    const finalComponentType = type ?? COMPONENT_DEFAULT_TYPE;
    return this._components[finalComponentType] ?? this._components[COMPONENT_DEFAULT_TYPE];
  };

  private _createComponentCollection = (
    componentsObjects?: IDictionary<
      IComponentDefinition<TComponentProps, TSettings> | VisualComponent<TComponentProps>
    >
  ): IDictionary<VisualComponentState<TComponentProps, TSettings>> => {
    const collection: IDictionary<VisualComponentState<TComponentProps, TSettings>> = {};

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    componentsObjects &&
      Object.entries(componentsObjects).forEach(([key, value]) => {
        collection[key] = new VisualComponentState<TComponentProps, TSettings>(value);
      });

    return collection;
  };
}

export const COMPONENT_DEFAULT_TYPE = 'default';

export interface IVisualComponentsObject<TSettings, TComponentProps> {
  Components?: IDictionary<
    IComponentDefinition<TComponentProps, TSettings> | VisualComponent<TComponentProps>
  >;
}
