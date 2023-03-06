export interface IBaseTemplate {
  sampleTextProp: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProp }) => {
  return (
    <div className="to-blue-3-disabled bg-gradient-to-tr from-blue-1-primary">
      {sampleTextProp}
    </div>
  );
};

export default BaseTemplate;
