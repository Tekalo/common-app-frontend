import {
  IBaseAccountLine,
  LineWrapper,
} from '@/sections/account/components/AccountLine/shared';
import Link from 'next/link';

interface IAccountLink extends IBaseAccountLine {
  href: string;
}

const AccountLink: React.FC<IAccountLink> = ({
  href,
  linkText,
  subtext,
  linkName,
  subtextName,
}) => {
  const link = (
    <Link data-name={linkName} href={href}>
      {linkText}
    </Link>
  );

  return (
    <LineWrapper
      isLink={true}
      topContent={link}
      bottomContent={subtext}
      subtextName={subtextName}
    />
  );
};

export default AccountLink;
