export interface IconTypeProps {
  width: number;
  height: number;
  color: string;
}

export type IconType = (props: IconTypeProps) => JSX.Element;
