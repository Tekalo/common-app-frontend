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

        <div className="lg:flex lg:flex-col lg:items-center">
          {/* Content */}
          <div className="lg:flex lg:flex-row lg:justify-center">
            <div className="flex flex-col items-center lg:max-w-[541px]">
              <h2 className="mb-6 text-center font-display text-h3-mobile text-black-text md:text-h2-mobile lg:mb-4 lg:p-0 lg:text-left lg:text-h3-desktop">
                {HOME_ABOUT_TEXT.HEADER}
              </h2>
              <p className="mb-14 text-center font-sans text-p2-desktop font-normal text-black-text md:text-p2-mobile lg:mb-8 lg:text-left lg:text-p2-desktop">
                {HOME_ABOUT_TEXT.BODY}
              </p>
            </div>

            {/* Pronunciation */}
            <PronunciationBox />
          </div>

          <div className="lg:justify-center-center lg:flex lg:flex-row-reverse">
            {/* Goals */}
            <GoalsList />

            {/* Benefits Image */}
            <BenefitsList />
          </div>
        </div>
        {/* Roles */}
        <RoleTypes />
      </div>
    </div>
  );
};

export default AboutSection;
