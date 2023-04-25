export interface IEssaySection {
  sampleTextProp: string;
}

const EssaySection: React.FC<IEssaySection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default EssaySection;
