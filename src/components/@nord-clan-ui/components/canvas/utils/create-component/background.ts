import type { Point } from '../../../../helpers/point';
import type { IVisualComponent } from '../../store/visual-component/visual-component-state.store';
import { SvgBackground } from '../../ui/background/background-svg';
import { createComponent } from './creator';

export type IBackgroundProps = IVisualComponent<IBackgroundComponentProps<ISvgBackgroundSettings>>;

export const createDefaultBackground = (settings?: Partial<ISvgBackgroundSettings>) => {
  return createComponent(SvgBackground, defaultSettings, settings);
};

const gridImageGenerator = (
  width: number,
  height: number,
  sizeMultiplicator: number,
  linesColor: string,
  linesOpacity: number
) => {
  linesColor = linesColor.replace('#', '%23');
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${
    width * sizeMultiplicator
  }' height='${
    height * sizeMultiplicator
  }' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='${linesColor}' fill-opacity='${linesOpacity}'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
};

export const createGridImageGenerator =
  (
    sizeMultiplicator: number,
    linesColor: string,
    linesOpacity: number
  ): BackgroundSvgImageGenerator =>
  (width: number, height: number) =>
    gridImageGenerator(width, height, sizeMultiplicator, linesColor, linesOpacity);

const dotsImageGenerator = (
  width: number,
  height: number,
  sizeMultiplicator: number,
  dotsColor: string,
  dotsOpacity: number,
  dotsRadius: number
) => {
  // eslint-disable-next-line operator-assignment
  sizeMultiplicator = 0.1 * sizeMultiplicator;
  dotsColor = dotsColor.replace('#', '%23');
  return `url("data:image/svg+xml,%3Csvg width='${width * sizeMultiplicator}' height='${
    height * sizeMultiplicator
  }' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${dotsColor}' fill-opacity='${dotsOpacity}' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='${dotsRadius}'/%3E%3Ccircle cx='13' cy='13' r='${dotsRadius}'/%3E%3C/g%3E%3C/svg%3E")`;
};

export const createDotsImageGenerator =
  (
    sizeMultiplicator: number,
    dotsColor: string,
    dotsOpacity: number,
    dotsRadius: number
  ): BackgroundSvgImageGenerator =>
  (width: number, height: number) =>
    dotsImageGenerator(width, height, sizeMultiplicator, dotsColor, dotsOpacity, dotsRadius);

const crossesImageGenerator = (
  width: number,
  height: number,
  sizeMultiplicator: number,
  color: string,
  opacity: number
) => {
  color = color.replace('#', '%23');
  return `url("data:image/svg+xml,%3Csvg width='${width * sizeMultiplicator}' height='${
    height * sizeMultiplicator
  }' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${color}' fill-opacity='${opacity}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
};

export const createCrossesImageGenerator =
  (sizeMultiplicator: number, color: string, opacity: number): BackgroundSvgImageGenerator =>
  (width: number, height: number) =>
    crossesImageGenerator(width, height, sizeMultiplicator, color, opacity);

export const defaultSettings: ISvgBackgroundSettings = {
  imageGenerator: createCrossesImageGenerator(0.2, '#858585', 0.1),
  color: 'transparent'
};

export type BackgroundSvgImageGenerator = (width: number, height: number) => string;

/**
 * @property {function}  imageGenerator - Function to create string for css's backgroundUrl property.
 * You can use for example services like listed in this article https://css-tricks.com/websites-generate-svg-patterns/
 * to generate this string.
 */
export interface ISvgBackgroundSettings {
  imageGenerator?: BackgroundSvgImageGenerator;
  color: string;
}

export interface IBackgroundComponentProps<TSettings = unknown> {
  diagramOffset: Point;
  diagramZoom: number;
  settings?: TSettings;
}
