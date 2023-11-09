import { HOME_ABOUT_TEXT } from '@/lang/en';

const PronunciationBox: React.FC = () => (
  <div className="relative mx-auto max-w-[445px] lg:ml-16 lg:self-center">
    {/* Main content bg */}
    <div className="absolute bottom-0 left-0 right-1 top-0 z-20 rounded border border-black-text bg-light-orange"></div>
    {/* Drop-shadow box */}
    <div className="absolute -bottom-1 left-1 right-0 top-1 z-10 rounded border border-black-text bg-illustration-orange"></div>

    {/* Text container */}
    <div className="m-auto mb-16 p-5 lg:mb-0 lg:max-w-[544px]">
      <div className="relative z-30 space-y-3 text-p2-mobile md:space-y-6 lg:space-y-5 lg:text-p2-desktop">
        <div>
          <span className="font-display font-semibold">
            {HOME_ABOUT_TEXT.PRONUNCIATION.TE}
          </span>
          {HOME_ABOUT_TEXT.PRONUNCIATION.KALO}
          <br />
          {HOME_ABOUT_TEXT.PRONUNCIATION.DEFINITION}
        </div>
        <div className="text-component-small">
          {HOME_ABOUT_TEXT.PRONUNCIATION.GOAL}
        </div>
      </div>
    </div>
  </div>
);

export default PronunciationBox;
