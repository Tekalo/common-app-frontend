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
        className={`h-12  rounded-[4px] border-blue-1-primary ${
          outlined
            ? 'border-2 border-blue-1-primary bg-white text-blue-1-primary'
            : 'bg-blue-1-primary text-white-text hover:bg-blue-2-hover'
        } flex items-center px-8 font-sans  focus:border-[3px] focus:border-[#A7C4DB] disabled:bg-blue-4-disabled`}
      >
        <span>{label}</span>
        {icon}
      </button>
    </>
  );
};

export default Button;
