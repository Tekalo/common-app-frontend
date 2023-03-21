export interface IContactSection {
  sampleTextProp: string;
}

const ContactSection: React.FC<IContactSection> = ({ sampleTextProp }) => {
  return (
    <div className="from-cyan-500 to-blue-500 bg-gradient-to-r">
      {sampleTextProp}
    </div>
  );
};

export default ContactSection;
