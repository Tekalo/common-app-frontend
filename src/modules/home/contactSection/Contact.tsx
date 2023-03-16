export interface IContact {
  sampleTextProp: string;
}

const Contact: React.FC<IContact> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default Contact;
