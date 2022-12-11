import type { FC } from 'react';
import type { INodeState } from '../store/node/node-state.store';
import type { ISettings } from '../store/canvas.store';
import { useEffect, useRef, createContext } from 'react';
import { observer } from 'mobx-react-lite';
import { CanvasStore } from '../store/canvas.store';
import { useNewStore } from '../../../helpers/index';

export const CanvasStoreContext = createContext<CanvasStore | null>(null);

export const DiagramContext: FC<IDiagramContextProps> = observer((props) => {
  const { initState, storeRef, settings, children } = props;

  const store = useNewStore(CanvasStore);
  const lastRenderedImportRef = useRef(-1);

  useEffect(() => {
    // store.importSettings(settings);
  }, [store, settings]);

  useEffect(() => {
    // store.importState(initState?.nodes ?? []);
  }, [store, initState]);

  useEffect(() => {
    if (storeRef) {
      storeRef.current = store;
    }
  }, [store, storeRef]);

  // useLayoutEffect(() => {
  //   if (store.diagramState.renderImportedRequestId > lastRenderedImportRef.current) {
  //     store.callbacks.importedStateRendered();
  //     lastRenderedImportRef.current = store.diagramState.renderImportedRequestId;
  //   }
  // }, [store.diagramState.renderImportedRequestId]);

  return <CanvasStoreContext.Provider value={store}>{children}</CanvasStoreContext.Provider>;
});

export type IDiagramContextProps = React.PropsWithChildren<{
  settings?: ISettings;
  initState?: IDiagramInitState;
  storeRef?: React.MutableRefObject<CanvasStore | null>;
}>;

export interface IDiagramInitState {
  nodes?: INodeState[];
}
