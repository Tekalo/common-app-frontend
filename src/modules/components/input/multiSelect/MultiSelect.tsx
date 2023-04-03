export interface IMultiSelect {
  sampleTextProp: string;
}

const MultiSelect: React.FC<IMultiSelect> = ({ sampleTextProp }) => {
  return (
    <div className="from-cyan-500 to-blue-500 bg-gradient-to-r">
      {sampleTextProp}
    </div>
  );
};

export default MultiSelect;
