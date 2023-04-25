export interface IPaySection {
  sampleTextProp: string;
}

const PaySection: React.FC<IPaySection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default PaySection;
