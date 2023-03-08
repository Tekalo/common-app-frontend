import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

interface IconTypeProps {
  width: number;
  height: number;
  color: string;
}

export type IconType = (_props: IconTypeProps) => React.ReactNode;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode;
};
