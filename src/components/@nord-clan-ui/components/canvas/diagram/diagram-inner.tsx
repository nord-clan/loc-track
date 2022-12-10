import type { FC, ReactNode, PropsWithChildren } from 'react';
import { useCanvasStore } from '#/components/@nord-clan-ui/hooks/store/useRootStore';
import { BackgroundWrapper } from '../background/background-wrapper';
import { observer } from 'mobx-react-lite';

export interface IDiagramInnerProps extends PropsWithChildren {
  diagramStyles?: React.CSSProperties;
  children?: ReactNode | undefined;
}

export const DigramInner: FC<IDiagramInnerProps> = observer((props) => {
  const { children } = props;
  const store = useCanvasStore();
  // useDiagramUserInteraction();

  // useResizeAction(() => {
  //   store.diagramState.ref.recalculateSizeAndPosition();
  //   store.nodesStore.nodes.forEach((n) => n.recalculatePortsOffset());
  // });

  // const offset = rootStore.diagramState.offset;
  // const zoom = rootStore.diagramState.zoom;
  // const transform = generateTransform(offset, zoom);
  // let className = 'react_fast_diagram_DiagramInner';
  // if (!rootStore.diagramSettings.userInteraction.arePointerInteractionsDisabled) {
  //   className += ' react_fast_diagram_touch_action_disabled';
  // }

  return (
    <div>
      <BackgroundWrapper />
      {/* <NodesLayer transform={transform} /> */}
      {children}
      {/* <MiniControlWrapper /> */}
    </div>
  );
});

// function useResizeAction(action: () => unknown) {
//   const rootStore = useRootStore();

//   useEffect(() => {
//     window.addEventListener('resize', action);
//     return () => window.removeEventListener('resize', action);
//   }, [rootStore, action]);
// }
