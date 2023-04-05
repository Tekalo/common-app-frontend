import { IconType } from '@/lib/types';

export interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  icon?: IconType;
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  onClick(): void;
}

const Button: React.FC<IButton> = ({
  onClick,
  label,
  icon,
  disabled,
  outlined,
  className,
}) => {
  const BASE = `group min-w-[118px] flex h-12 flex-row font-semibold
    content-center items-center justify-center rounded font-sans text-component-large font-normal transition-colors hover:bg-blue-2 focus-visible:ring-2 focus-visible:ring-[#A7C4DB] active:border-blue-3 active:bg-blue-3 disabled:border-blue-4 disabled:bg-blue-4 disabled:text-white group ${className}`;

  const DEFAULT = `${BASE} bg-blue-1 text-white`;

  const OUTLINED = `${BASE} bg-white text-blue-1 border-2 border-blue-1 hover:border-blue-2 hover:text-white`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={outlined ? OUTLINED : DEFAULT}
    >
      <div className="flex items-center justify-center space-x-0">
        {label}
        {icon ? <>{icon}</> : null}
      </div>
    </button>
  );
};

export default Button;
