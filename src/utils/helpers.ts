export const isWindowExists = () => {
  return typeof window !== 'undefined';
};

export function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}

const getUrlParam = (paramName: string): string | null =>
  new URLSearchParams(window.location.search).get(paramName);

export default getUrlParam;
