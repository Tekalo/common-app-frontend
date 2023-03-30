export interface IListboxInput {
  sampleTextProp: string;
}

const ListboxInput: React.FC<IListboxInput> = ({ sampleTextProp }) => {
  return (
    <div className="from-cyan-500 to-blue-500 bg-gradient-to-r">
      {sampleTextProp}
    </div>
  );
};

export default ListboxInput;
