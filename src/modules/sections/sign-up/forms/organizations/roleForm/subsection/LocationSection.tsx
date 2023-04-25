export interface ILocationSection {
  sampleTextProp: string;
}

const LocationSection: React.FC<ILocationSection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default LocationSection;
