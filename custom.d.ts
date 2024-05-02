declare module '*.svg';

declare module '*.jpg';

declare module '*.png';

declare module '*.webp';

declare module '*.gif';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}