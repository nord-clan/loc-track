export type IPoint = [number, number];

export function isPoint(value: unknown): value is IPoint {
  return Array.isArray(value) && value.length === 2 && value.every((v) => Number.isFinite(v));
}

export const distanceBetweenPoints = (a: IPoint, b: IPoint): number =>
  Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);

export const roundPoint = (point: IPoint) => [Math.round(point[0]), Math.round(point[1])] as IPoint;

export const addPoints = (...points: (IPoint | undefined | null)[]): IPoint =>
  points.reduce((prev, curr) => {
    if (curr) {
      return [(prev ? prev[0] : 0) + curr[0], (prev ? prev[1] : 0) + curr[1]];
    }
    return prev;
  }) ?? [0, 0];

export const subtractPoints = (...points: IPoint[]): IPoint =>
  points.reduce((prev, curr) => (curr ? [prev[0] - curr[0], prev[1] - curr[1]] : prev));

export const multiplyPoint = (a: IPoint, m: number): IPoint => [a[0] * m, a[1] * m];

export const arePointsEqual = (a?: IPoint, b?: IPoint): boolean =>
  a === b || (isPoint(a) && isPoint(b) && a[0] === b[0] && a[1] === b[1]);
