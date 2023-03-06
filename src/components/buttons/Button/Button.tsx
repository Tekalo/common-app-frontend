export interface IButton {
  sampleTextProp: string;
}

const Button: React.FC<IButton> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-red-500">
      {sampleTextProp}
    </div>
  );
};

export default Button;
