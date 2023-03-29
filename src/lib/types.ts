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
  className?: string;
}

// Types
export type IconType = (_props: IconTypeProps) => React.ReactNode;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};
