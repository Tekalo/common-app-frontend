import { IconType } from '@/lib/types';

export enum ButtonVariant {
  OUTLINED,
  RED,
}
export interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  label: string;
  disabled?: boolean;
  href?: string;
  iconBefore?: IconType;
  iconAfter?: IconType;
  name?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
}

const Button: React.FC<IButton> = ({
  label,
  className,
  disabled,
  href,
  iconBefore,
  iconAfter,
  name,
  onClick,
  type,
  variant,
}) => {
  const BASE = `group min-w-[118px] flex h-12 flex-row content-center
                items-center justify-center rounded font-sans
                text-component-large transition-colors hover:bg-blue-2
                focus-visible:ring-2 focus-visible:ring-[#A7C4DB]
                active:border-blue-3 active:bg-blue-3 disabled:border-blue-4
                disabled:bg-blue-4 disabled:text-white group  disabled:cursor-not-allowed ${className}`;

  const DEFAULT = `${BASE} bg-blue-1 text-white`;

  const OUTLINED = `${BASE} bg-white text-blue-1 border-2 border-blue-1 hover:border-blue-2 hover:text-white`;

  const RED = `${BASE} bg-red-error text-white hover:bg-red-hover active:bg-red-active`;

  const getButtonVariantStyles = () => {
    switch (variant) {
      case ButtonVariant.OUTLINED:
        return OUTLINED;
      case ButtonVariant.RED:
        return RED;

      default:
        return DEFAULT;
    }
  };

  const btnStyles = getButtonVariantStyles();

  // If you pass an href, this is a link. Do not also pass an onclick, it won't do anything
  return href ? (
    <a id={name} type={type} href={href} className={btnStyles}>
      <>
        {iconBefore ? <>{iconBefore}</> : null}
        {<div>{label}</div>}
        {iconAfter ? <>{iconAfter}</> : null}
      </>
    </a>
  ) : (
    <button
      id={name}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={btnStyles}
    >
      <>
        {iconBefore ? <>{iconBefore}</> : null}
        {<div>{label}</div>}
        {iconAfter ? <>{iconAfter}</> : null}
      </>
    </button>
  );
};

export default Button;
