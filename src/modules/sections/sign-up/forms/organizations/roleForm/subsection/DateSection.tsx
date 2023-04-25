export interface IDateSection {
  sampleTextProp: string;
}

const DateSection: React.FC<IDateSection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default DateSection;
