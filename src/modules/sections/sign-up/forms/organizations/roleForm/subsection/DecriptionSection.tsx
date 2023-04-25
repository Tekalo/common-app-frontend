export interface IDescriptionSection {
  sampleTextProp: string;
}

const DescriptionSection: React.FC<IDescriptionSection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default DescriptionSection;
