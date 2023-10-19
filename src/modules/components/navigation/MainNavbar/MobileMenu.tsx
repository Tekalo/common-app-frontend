import { NAV_BAR_TEXT } from '@/lang/en';

interface IMobileMenu {
  handleAuthentication: () => void;
  hideMobileMenu: () => void;
  logInOutLabel: string;
  mobileMenuIsOpen: boolean;
  scrollToSection: (section: 'faq' | 'how') => void;
}

const MobileMenu: React.FC<IMobileMenu> = ({
  handleAuthentication,
  hideMobileMenu,
  logInOutLabel,
  mobileMenuIsOpen,
  scrollToSection,
}) => {
  const mobileLinks = [
    {
      text: NAV_BAR_TEXT.HOW_IT_WORKS,
      action: () => {
        scrollToSection('how');
      },
    },
    {
      text: NAV_BAR_TEXT.FAQ,
      action: () => {
        scrollToSection('faq');
      },
    },
    { text: logInOutLabel, action: handleAuthentication },
  ];

  return (
    <div className={`md:hidden ${!mobileMenuIsOpen ? 'hidden' : ''}`}>
      {/* Mobile Overlay */}
      <div
        className="fixed bottom-0 left-0 right-0 top-32 z-20 bg-black-text bg-opacity-75"
        onClick={() => hideMobileMenu()}
      ></div>
      {/* Mobile Menu */}
      <div className="relative z-30 bg-white px-6 py-4">
        {mobileLinks.map((link, i) => (
          <div
            onClick={() => link.action()}
            key={i}
            className="px-4 py-3 text-component-large"
          >
            {link.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
