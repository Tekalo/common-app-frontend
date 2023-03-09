import Button from '@/components/buttons/Button/Button';
import Link from 'next/link';

export interface IMainNavbar extends React.ComponentPropsWithoutRef<'header'> {}

const MainNavbar: React.FC<IMainNavbar> = ({ className, ...headerProps }) => {
  return (
    <nav className="bg-gray-100">
      <div className="mx-auto h-auto bg-white px-20">
        <div className="flex justify-between">
          <div className="flex py-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-row space-x-4 px-8 py-3 text-component-lg text-black-text"
            >
              LOGO TBD
            </Link>
          </div>
          <div className="flex items-center space-x-10">
            <Link
              href="/"
              className="text-component-xl font-normal text-black-text"
            >
              Log in
            </Link>
            <Link href="/" className="">
              <Button
                className="font-normal"
                label="Get started"
                onClick={() => {}}
              />
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
    </nav>
  );
};

export default MainNavbar;
