import type { FC } from 'react';
import type { INodeState } from '../store/node/node-state.store';
import type { ISettings } from '../store/canvas.store';
import { useEffect, useRef, createContext, useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { CanvasStore } from '../store/canvas.store';
import { useNewStore } from '../../../helpers/index';

export const CanvasStoreContext = createContext<CanvasStore | null>(null);

export const DiagramContext: FC<IDiagramContextProps> = observer((props) => {
  const { initState, storeRef, settings, children } = props;

  const store = useNewStore(CanvasStore);
  const { diagramState, importSettings, importState, callbacks } = store;
  const { renderImportedRequestId } = diagramState;

  const lastRenderedImportRef = useRef(-1);

  useEffect(() => {
    importSettings(settings);
  }, [store, settings]);

  useEffect(() => {
    importState(initState?.nodes ?? []);
  }, [store, initState]);

  useEffect(() => {
    if (storeRef) {
      storeRef.current = store;
    }
  }, [store, storeRef]);

  useLayoutEffect(() => {
    if (renderImportedRequestId > lastRenderedImportRef.current) {
      callbacks.importedStateRendered();
      lastRenderedImportRef.current = renderImportedRequestId;
    }
  }, [renderImportedRequestId]);

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
