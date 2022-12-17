import type {
  IComponentDefinition,
  IVisualComponent
} from '../../store/visual-component/visual-component-state.store';

export const createComponent = <TSettings, TComponentProps>(
  Component: IVisualComponent<TComponentProps>,
  defaultSettings: TSettings,
  customSettings?: Partial<TSettings>
): IComponentDefinition<TComponentProps, TSettings> => {
  const settings = {
    ...defaultSettings,
    ...(customSettings || {})
  };

  return {
    Component,
    settings
  };
};
