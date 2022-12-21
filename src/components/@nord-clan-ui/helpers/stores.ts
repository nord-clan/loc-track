import type { FormStore } from '../components/form/form.store';
import type { ControlStore } from '../components/control.store';
import type { TControllerRef } from '.';
import type { MutableRefObject } from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { getId } from '.';

//* ---- MobX store helpers ------------------------------ * //
export const setupFormStores = (stores: unknown[], form: FormStore): void => {
  stores.forEach((store) => form.addStore(store as ControlStore<unknown>));
};

export const useNewStore = <T, P>(
  Store: new (args: P) => T,
  args: P = {} as P,
  dependencies: [] = []
): T => useMemo(() => new Store(args), dependencies);

export const useGetController = <T>(store: { controller: T }): TControllerRef<T> => {
  const controller = useRef<T>();
  controller.current = store.controller;
  return controller;
};

export const setController = <T>(store: { controller: T }, controllerRef: TControllerRef<T>): T => {
  const { controller } = store;
  controllerRef.current = controller;
  return controller;
};

type WithApiRequestAbortDestructor = () => void;

export const useEffectWithApiRequestAbort = <T>(
  callback: (requestId: string, dependencies: T[]) => void | WithApiRequestAbortDestructor,
  dependencies: T[],
  returnCallback?: () => void
): void => {
  const requestId = useMemo(() => getId(), []);
  useEffect(() => {
    callback(requestId, dependencies);
    return () => {
      returnCallback?.();
      //   ApiProxy.abort(requestId);
    };
  }, dependencies);
};

export const useRequestIdAbort = (): string => {
  const requestId = useMemo(() => getId(), []);
  useEffect(() => {
    return () => {
      //   ApiProxy.abort(requestId);
    };
  }, []);
  return requestId;
};

export const setupStoreId = <T extends ControlStore<unknown>>(
  store: T
): MutableRefObject<string> => {
  const id = useRef<string>(getId());

  useEffect(() => {
    store.components.add(id.current);
    return () => {
      store.components.remove(id.current);
    };
  }, []);

  return id;
};
