export interface IAboutSection {
  sampleTextProp: string;
}

const AboutSection: React.FC<IAboutSection> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default AboutSection;
