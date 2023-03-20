export interface IFAQS {
  sampleTextProp: string;
}

const FAQS: React.FC<IFAQS> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default FAQS;
