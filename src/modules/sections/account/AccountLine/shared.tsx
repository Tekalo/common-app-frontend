import { ReactElement } from 'react';

export interface IBaseAccountLine {
  linkName: string;
  linkText: string;
  subtext: string;
  subtextName: string;
}

interface IAccountLineWrapper {
  topContent: ReactElement;
  bottomContent: string;
  subtextName: string;
  isLink: boolean;
  icon?: ReactElement;
}

export const LineWrapper: React.FC<IAccountLineWrapper> = ({
  topContent,
  bottomContent,
  subtextName,
  isLink,
}) => {
  const textColor = isLink ? 'text-blue-1' : 'text-black-text';

  return (
    <div className="space-y-2">
      <div className={`flex items-baseline text-component-medium ${textColor}`}>
        {topContent}
      </div>

      <div data-name={subtextName} className="text-p3-desktop text-gray-1">
        {bottomContent}
      </div>
    </div>
  );
};
