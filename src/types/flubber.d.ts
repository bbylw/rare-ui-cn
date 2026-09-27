declare module "flubber" {
  export type Interpolator = (t: number) => string;
  export type Shape = string | string[];
  export type Options = Record<string, unknown>;

  export function interpolate(
    fromShape: Shape,
    toShape: Shape,
    options?: Options,
  ): Interpolator;

  export function separate(
    fromShape: Shape,
    toShape: Shape,
    options?: Options,
  ): Interpolator;

  export function combine(
    fromShapeList: string[],
    toShape: Shape,
    options?: Options,
  ): Interpolator;

  export function interpolateAll(
    fromShapeList: string[],
    toShape: Shape,
    options?: Options,
  ): Interpolator;

  export function splitPathString(path: string): number[][][];

  export function toPathString(points: number[][][]): string;

  export function fromCircle(cx: number, cy: number, r: number): string;

  export function toCircle(
    shape: string,
    cx: number,
    cy: number,
    r: number,
  ): Interpolator;

  export function fromRect(
    x: number,
    y: number,
    width: number,
    height: number,
  ): string;

  export function toRect(
    shape: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): Interpolator;
}
