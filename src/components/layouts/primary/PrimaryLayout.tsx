export interface IPrimaryLayout {
  sampleTextProp: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default PrimaryLayout;
