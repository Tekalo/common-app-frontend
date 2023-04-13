import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

// Interfaces
interface IconTypeProps {
  width: number;
  height: number;
  color: string;
}

export interface ITimelineItem {
  title?: string;
  text: string;
  className?: string;
  isActive?: boolean;
}

export interface IFaqItem {
  questionText: string;
  answerText: string;
  extras?: ReactElement;
  className?: string;
}

export interface IRadioItem {
  value: string;
  displayText: string;
}

export interface ISelectItem {
  value: string;
  displayText: string;
}

// Types
export type IconType = (_props: IconTypeProps) => React.ReactNode;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

export enum TablePadding {
  // eslint-disable-next-line no-unused-vars
  ZERO = 'w-[calc(100%)]',
  // eslint-disable-next-line no-unused-vars
  SIX = 'w-[calc(100%+24px)]',
}

export type TableData = {
  headers: {
    heading: string;
    subheading: string;
  }[];
  content: {
    heading: string;
    bullets: string[][];
  }[];
};
