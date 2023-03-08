export interface IButton {
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
  outlined: boolean;
  onClick(): void;
}

const Button: React.FC<IButton> = ({
  onClick,
  label,
  icon,
  disabled,
  outlined,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`h-12 rounded-[4px] border-blue-1-primary text-component-lg ${
          outlined
            ? 'border-2 border-blue-1-primary bg-white text-blue-1-primary'
            : 'bg-blue-1-primary text-white-text hover:bg-blue-2-hover'
        } flex h-12 w-[168px] flex-row items-center gap-[2px] px-8 py-3 font-sans font-normal text-blue-1-primary focus:border-[3px] focus:border-[#A7C4DB] disabled:bg-blue-4-disabled`}
      >
        <span>{label}</span>
        <span>{icon}</span>
      </button>
    </>
  );
};

export default Button;
