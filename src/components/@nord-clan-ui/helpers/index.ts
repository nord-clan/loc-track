import type { FormStore } from '../components/form/form.store';
import type { ControlStore } from '../components/control.store';
import type { MutableRefObject } from 'react';
import type { Point } from './point';
import { v4 } from 'uuid';
import { useEffect, useMemo, useRef } from 'react';

export type BoundingBox = {
  topLeftCorner: Point;
  bottomRightCorner: Point;
  size: Point;
};

export type TControllerRef<T> = MutableRefObject<T | undefined>;
export type Size = 's' | 'm' | 'l';
export const getId = (): string => {
  let uuid = v4();
  const possible = 'abcdef';
  uuid = uuid.replace(uuid.charAt(0), possible.charAt(Math.floor(Math.random() * possible.length)));
  return uuid;
};

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

export interface IDictionary<T> {
  [key: string]: T;
}

export function isNumber(value: unknown): value is number {
  return Number.isFinite(value);
}

export function isObject(value: unknown): value is object {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

export function isBoolean(value: unknown): value is boolean {
  return value != null && typeof value === 'boolean';
}

export function clampValue(value: number, interval: Point) {
  return Math.min(Math.max(value, interval[0]), interval[1]);
}

export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function combineArrays<T>(...arrays: (T[] | undefined)[]): T[] {
  const combined: T[] = [];
  arrays.forEach((a) => a?.forEach((v) => v && combined.push(v)));
  return combined;
}
