import AboutContent from './components/aboutContent';
import BenefitsList from './components/benefitsList';
import GoalsList from './components/goalsList';
import PronunciationBox from './components/pronunciationBox';
import RoleTypes from './components/roleTypes';
import SponsorLogos from './components/sponsorLogos';

const AboutSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center px-6 pb-12 pt-20 md:pb-20 md:pt-16 lg:pb-28 lg:pt-28">
      <div className="w-full max-w-content-area">
        {/* Coalition Logos */}
        <SponsorLogos />

        <div className="lg:mb-44 lg:flex lg:flex-col lg:gap-y-7">
          <div className="lg:flex lg:flex-row">
            <AboutContent />
            <PronunciationBox />
          </div>

          <div className="lg:justify-center-center lg:flex lg:flex-row-reverse">
            <GoalsList />
            <BenefitsList />
          </div>
        </div>
        <RoleTypes />
      </div>
    </div>
  );
};

export default AboutSection;
