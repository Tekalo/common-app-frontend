export interface IMainFooter {
  sampleTextProp: string;
}

const MainFooter: React.FC<IMainFooter> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default MainFooter;
