import { ReactElement } from 'react';
import { IBaseAccountLine, LineWrapper } from './shared';

interface IAccountDisplay extends IBaseAccountLine {
  icon: ReactElement;
}

const AccountDisplay: React.FC<IAccountDisplay> = ({
  icon,
  linkText,
  subtext,
  linkName,
  subtextName,
}) => {
  const iconTemplate = (
    <div className="flex items-baseline">
      {icon}
      <div data-name={linkName}>{linkText}</div>
    </div>
  );
  const displayTemplate = (
    <div data-name={linkName} className="ml-1">
      {linkText}
    </div>
  );

  const displayContent = (
    <div className="flex">{icon ? iconTemplate : displayTemplate}</div>
  );

  return (
    <LineWrapper
      icon={icon}
      isLink={false}
      topContent={displayContent}
      bottomContent={subtext}
      subtextName={subtextName}
    />
  );
};

export default AccountDisplay;
