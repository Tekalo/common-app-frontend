export interface ILiteFooter {
  sampleTextProp: string;
}

const LiteFooter: React.FC<ILiteFooter> = ({ sampleTextProp }) => {
  return (
    <div className="from-cyan-500 to-blue-500 bg-gradient-to-r">
      {sampleTextProp}
    </div>
  );
};

export default LiteFooter;
