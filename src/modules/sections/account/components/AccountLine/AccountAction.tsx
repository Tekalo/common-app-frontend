import {
  IBaseAccountLine,
  LineWrapper,
} from '@/sections/account/components/AccountLine/shared';
import { ReactElement } from 'react';

interface IAccountAction extends IBaseAccountLine {
  action: () => void;
  icon?: ReactElement;
}

const AccountAction: React.FC<IAccountAction> = ({
  action,
  linkText,
  subtext,
  linkName,
  subtextName,
  icon,
}) => {
  const iconTemplate = (
    <div className="flex">
      {icon}
      <div
        data-name={linkName}
        className="ml-1 cursor-pointer text-component-medium text-blue-1"
        onClick={action}
      >
        {linkText}
      </div>
    </div>
  );
  const displayTemplate = (
    <div
      data-name={linkName}
      className="cursor-pointer text-component-medium text-blue-1"
      onClick={action}
    >
      {linkText}
    </div>
  );

  const actionContent = icon ? iconTemplate : displayTemplate;

  return (
    <LineWrapper
      isLink={true}
      icon={icon}
      topContent={actionContent}
      bottomContent={subtext}
      subtextName={subtextName}
    />
  );
};

export default AccountAction;
