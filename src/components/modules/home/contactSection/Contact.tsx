export interface IContact {
  sampleTextProp: string;
}

const Contact: React.FC<IContact> = ({ sampleTextProp }) => {
  return (
    <div className="from-cyan-500 to-blue-500 bg-gradient-to-r">
      {sampleTextProp}
    </div>
  );
};

export default Contact;
