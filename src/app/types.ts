import type { PropsWithChildren, CSSProperties } from 'react';

export type TagCssAttrs = {
  className?: string;
  style?: CSSProperties;
};

export type PropsWithChildrenAndCss<T = {}> = PropsWithChildren<T> &
  TagCssAttrs;
