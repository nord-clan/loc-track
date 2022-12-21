import type { MutableRefObject } from 'react';
import type { IPoint } from './point';
import { v4 } from 'uuid';

export type TControllerRef<T> = MutableRefObject<T | undefined>;
export type Size = 's' | 'm' | 'l';
export const getId = (): string => {
  let uuid = v4();
  const possible = 'abcdef';
  uuid = uuid.replace(uuid.charAt(0), possible.charAt(Math.floor(Math.random() * possible.length)));
  return uuid;
};

//* ---- just helpers ------------------------------ * //
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

export function clampValue(value: number, interval: IPoint) {
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

export type BoundingBox = {
  topLeftCorner: IPoint;
  bottomRightCorner: IPoint;
  size: IPoint;
};
