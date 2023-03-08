import { IconType } from '@/lib/types';

export interface IButton {
  icon?: IconType;
  label: string;
  disabled?: boolean;
  outlined: boolean;
  small: boolean;
  onClick(): void;
}

const Button: React.FC<IButton> = ({
  onClick,
  label,
  icon,
  disabled,
  outlined,
  small,
}) => {
  const BASE = `group flex h-12 flex-row
    content-center items-center gap-[10px] rounded border-2 border-blue-1-primary ${
      small ? 'px-4 py-0' : 'px-8 py-3'
    } font-sans text-component-lg font-normal hover:border-blue-2-hover
    hover:bg-blue-2-hover focus-visible:ring-2 focus-visible:ring-[#A7C4DB] active:border-blue-3-pressed active:bg-blue-3-pressed disabled:border-blue-4-disabled disabled:bg-blue-4-disabled
  disabled:text-white-text group`;

  const DEFAULT = `${BASE} bg-blue-1-primary text-white-text`;

  const OUTLINED = `${BASE} bg-white text-blue-1-primary hover:text-white-text`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={outlined ? OUTLINED : DEFAULT}
    >
      <div className="space-x-o flex items-center">
        <span>{label}</span>
        {icon ? <>{icon}</> : null}
      </div>
    </button>
  );
};

export default Button;
