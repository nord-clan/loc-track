import type { FC } from 'react';
import type { INodeVisualComponentProps } from './node-settings';
import type { NodeState } from './node-state.store';
import type {
  IComponentDefinition,
  VisualComponent
} from '../visual-component/visual-component-state.store';
import { observer } from 'mobx-react-lite';

const NodeDefault: FC<INodeVisualComponentProps<INodeDefaultSettings>> = observer((props) => {
  const { entity, settings } = props;

  // const stylingOptions = useMemo<IUseStylingOptions>(
  //   () => ({
  //     removeDefaultClasses: settings?.removeDefaultClasses,
  //     baseState: 'base',
  //     classes: settings?.classes,
  //     defaultClasses: defaultNodeClasses,
  //     style: settings?.style,
  //     spareStates: { 'selected-hovered': ['selected', 'hovered'] }
  //   }),
  //   [settings]
  // );

  // let state = 'base';
  // if (entity.selected && entity.hovered) state = 'selected-hovered';
  // else if (entity.selected) state = 'selected';
  // else if (entity.hovered) state = 'hovered';

  // const styling = useStyling(stylingOptions, state);

  // return (
  //   <div className={styling.className} style={styling.style}>
  //     {settings?.innerNode && <settings.innerNode node={entity} />}

  //     {Array.isArray(settings?.ports) && settings?.ports.map((p) => <Port id={p.id} key={p.id} />)}
  //   </div>
  // );

  return <div>1</div>;
});

export interface INodeDefaultSettings {
  idk?: unknown;
  innerNode?: VisualComponent<{ node: NodeState }>;
  removeDefaultClasses?: true;
  classes?: NodeDefaultSettingsByStates<string[]>;
  style?: NodeDefaultSettingsByStates<React.CSSProperties>;
}

export type NodeDefaultState = 'base' | 'hovered' | 'selected' | 'selected-hovered';
export type NodeDefaultSettingsByStates<TValue> = {
  [key in NodeDefaultState]?: TValue;
};

export const defaultNodeClasses: NodeDefaultSettingsByStates<string[]> = {
  base: ['react_fast_diagram_NodeDefault'],
  hovered: ['react_fast_diagram_NodeDefault_Hovered'],
  selected: ['react_fast_diagram_NodeDefault_Selected']
};

export function createNode(
  settings?: INodeDefaultSettings
): IComponentDefinition<INodeVisualComponentProps<INodeDefaultSettings>, INodeDefaultSettings> {
  return {
    Component: NodeDefault,
    settings: {
      // innerNode: NodeLabel,
      ...settings
    }
  };
}
