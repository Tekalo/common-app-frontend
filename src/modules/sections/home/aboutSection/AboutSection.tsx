import { HOME_ABOUT_TEXT } from '@/lang/en';
import BenefitsList from './components/benefitsList';
import GoalsList from './components/goalsList';
import PronunciationBox from './components/pronunciationBox';
import RoleTypes from './components/roleTypes';
import SponsorLogos from './components/sponsorLogos';

export interface IAboutSection {}

const AboutSection: React.FC<IAboutSection> = () => {
  return (
    <div className="flex flex-col items-center px-6 pb-12 pt-20 md:pb-20 md:pt-16 lg:pb-28 lg:pt-28">
      <div className="w-full max-w-content-area">
        {/* Coalition Logos */}
        <SponsorLogos />

        {/* Content */}
        <div className="flex flex-col items-center">
          <h2 className="mb-6 max-w-[590px] text-center font-display text-h3-mobile text-black-text md:text-h2-mobile lg:mb-10 lg:max-w-[924px] lg:p-0 lg:text-h2-desktop">
            {HOME_ABOUT_TEXT.HEADER}
          </h2>
          <p className="mb-14 max-w-[590px] text-center font-sans text-p2-desktop font-normal text-black-text md:text-p1-mobile lg:mb-8 lg:max-w-[735px] lg:text-p1-desktop">
            {HOME_ABOUT_TEXT.BODY}
          </p>
        </div>

        {/* Pronunciation */}
        <PronunciationBox />

        {/* Goals */}
        <GoalsList />

        {/* Benefits Image */}
        <BenefitsList />

        {/* Roles */}
        <RoleTypes />
      </div>
    </div>
  );
};

export default AboutSection;
