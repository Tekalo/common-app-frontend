export interface IRequirementSection {
  sampleTextProp: string;
}

const RequirementSection: React.FC<IRequirementSection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default RequirementSection;
