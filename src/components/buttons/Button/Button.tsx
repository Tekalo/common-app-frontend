export interface IButton {
  icon?: React.ReactNode;
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
  const BASE = `flex h-12 flex-row content-center items-center gap-[10px] rounded border-2 border-blue-1-primary ${
    small ? 'px-4 py-0' : 'px-8 py-3'
  } font-sans text-component-lg font-normal hover:border-blue-2-hover
    hover:bg-blue-2-hover focus:ring-2 focus:ring-[#A7C4DB] active:border-blue-3-pressed active:bg-blue-3-pressed disabled:border-blue-4-disabled disabled:bg-blue-4-disabled
  disabled:text-white-text`;

  const DEFAULT = `${BASE} bg-blue-1-primary text-white-text`;

  const OUTLINED = `${BASE} bg-white text-blue-1-primary hover:text-white-text`;

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={outlined ? OUTLINED : DEFAULT}
      >
        <span>{label}</span>
        {icon ? <span>{icon}</span> : null}
      </button>
    </>
  );
};

export default Button;
