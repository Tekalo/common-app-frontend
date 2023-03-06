export interface IButton {
  sampleTextProp: string;
}

const Button: React.FC<IButton> = ({ sampleTextProp }) => {
  return (
    <button className="rounded-full bg-gradient-to-r from-yellow-500 to-red-500">
      {sampleTextProp}
    </button>
  );
};

export default Button;
