import type { IPoint } from './point';
import { arePointsEqual } from './point';

export const generateTransform = (translate: IPoint, scale?: number): string => {
  const translatePart = `translate(${translate[0]}px, ${translate[1]}px)`;
  if (scale) {
    const scalePart = `scale(${scale})`;
    return `${translatePart} ${scalePart}`;
  }
  return translatePart;
};

export interface ITransformation {
  zoom: number;
  offset: IPoint;
}

export const areTransformationsEqual = (a: ITransformation, b: ITransformation): boolean =>
  a === b || (a && b && a.zoom === b.zoom && arePointsEqual(a.offset, b.offset));
