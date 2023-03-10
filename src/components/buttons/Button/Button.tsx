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
  const BASE = `group min-w-[118px] flex h-12 flex-row
    content-center items-center justify-center rounded font-sans text-component-lg font-normal transition-colors hover:bg-blue-2-hover focus-visible:ring-2 focus-visible:ring-[#A7C4DB] active:border-blue-3-pressed active:bg-blue-3-pressed disabled:border-blue-4-disabled disabled:bg-blue-4-disabled disabled:text-white-text group ${className}`;

  const DEFAULT = `${BASE} bg-blue-1-primary text-white-text`;

  const OUTLINED = `${BASE} bg-white text-blue-1-primary border-2 border-blue-1-primary hover:border-blue-2-hover hover:text-white-text`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={outlined ? OUTLINED : DEFAULT}
    >
      <div className="space-x-o flex items-center justify-center">
        {label}
        {icon ? <>{icon}</> : null}
      </div>
    </button>
  );
};

export default Button;
