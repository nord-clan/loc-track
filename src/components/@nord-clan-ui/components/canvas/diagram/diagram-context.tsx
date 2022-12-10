import type { FC } from 'react';
import type { INodeState } from '../node/node.interface';
import React, { createContext } from 'react';
import { observer } from 'mobx-react-lite';
import { CanvasStore } from '../store/canvas.store';
import { useNewStore } from '#/@nord-clan';

export const CanvasStoreContext = createContext<CanvasStore | null>(null);

export const DiagramContext: FC<IDiagramContextProps> = observer((props) => {
  const store = useNewStore(CanvasStore);
  // const lastRenderedImportRef = useRef(-1);

  // useEffect(() => {
  //   store.importSettings(props.settings);
  // }, [store, props.settings]);

  // useEffect(() => {
  //   store.importState(props.initState?.nodes ?? []);
  // }, [store, props.initState]);

  // useEffect(() => {
  //   if (props.storeRef) {
  //     props.storeRef.current = store;
  //   }
  // }, [store, props.storeRef]);

  // useLayoutEffect(() => {
  //   if (store.diagramState.renderImportedRequestId > lastRenderedImportRef.current) {
  //     store.callbacks.importedStateRendered();
  //     lastRenderedImportRef.current = store.diagramState.renderImportedRequestId;
  //   }
  // }, [store.diagramState.renderImportedRequestId]);

  return <CanvasStoreContext.Provider value={store}>{props.children}</CanvasStoreContext.Provider>;
});

export type IDiagramContextProps = React.PropsWithChildren<{
  // settings?: ISettings;
  initState?: IDiagramInitState;
  storeRef?: React.MutableRefObject<CanvasStore | null>;
}>;

export interface IDiagramInitState {
  nodes?: INodeState[];
}
