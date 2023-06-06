import { PRIVACY_LINK, TERMS_TEXT } from '@/lang/en';

export interface ITermsAndConditions {}

const TermsAndConditions: React.FC<ITermsAndConditions> = () => {
  const h4Mobile = 'mb-4 text-h4-mobile lg:text-h4-desktop';
  const lightBlueBox = 'bg-light-blue p-3 md:p-4';
  const p2Mobile = 'text-p2-mobile mb-8 lg:text-p2-desktop';
  const largeCaption =
    'text-large-caption-mobile uppercase lg:text-large-caption-desktop';

  return (
    <div className="m-auto max-w-content-area px-6 pb-32 pt-8 md:pt-10 lg:pb-44">
      <h2 className="mb-14 text-center text-h2-mobile md:mb-20 lg:mb-24 lg:text-h2-desktop">
        {TERMS_TEXT.title}
      </h2>
      <div className="mb-8 text-large-caption-mobile uppercase text-gray-1 lg:text-large-caption-desktop">
        {TERMS_TEXT.lastUpdate}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.aboutTitle}</div>
      <div className={`${lightBlueBox} mb-7 text-p2-desktop`}>
        {TERMS_TEXT.aboutSummary}
      </div>
      <div className={`mb-8 space-y-4 ${largeCaption}`}>
        {TERMS_TEXT.aboutText}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.minAgeTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.minAgeTitle}
      </div>
      <div className={p2Mobile}>{TERMS_TEXT.minAgeText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.privacyInfoTitle}</div>
      <div className={p2Mobile}>
        {TERMS_TEXT.privacyInfoText[0]}
        <a
          target="_blank"
          className="text-blue-1 underline underline-offset-4"
          href={PRIVACY_LINK}
          rel="noreferrer"
        >
          {TERMS_TEXT.privacyInfoText[1]}
        </a>
        {TERMS_TEXT.privacyInfoText[2]}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.accountTitle}</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        {TERMS_TEXT.accountSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.accountText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.futuresEngineTitle}</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        {TERMS_TEXT.futuresEngineSummary}
      </div>
      <div className={p2Mobile}>{TERMS_TEXT.futuresEngineText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.userMaterialTitle}</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        {TERMS_TEXT.userMaterialSummary[0]}
        <a
          href="http://tekalo.org/privacy-info"
          className="text-blue-1 underline underline-offset-4"
          target="_blank"
          rel="noreferrer"
        >
          {TERMS_TEXT.userMaterialSummary[1]}
        </a>
        {TERMS_TEXT.userMaterialSummary[2]}
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        {TERMS_TEXT.userMaterialText}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.submissionGuideTitle}</div>
      <div className={`${lightBlueBox} mb-7 text-p2-mobile`}>
        {TERMS_TEXT.submissionGuideSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        {TERMS_TEXT.submissionGuideText}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.warrantyTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.warrantySummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.warrantyText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.disclaimerTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.disclaimerSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.disclaimerText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.otherTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.otherSummary}
      </div>
      <div className={`${p2Mobile}`}>{TERMS_TEXT.otherText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.copyrightTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.copyrightSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.copyrightText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.warrantyDisclaimerTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.warrantyDisclaimerSumary}
      </div>
      <div className={`space-y-4 ${largeCaption} mb-8`}>
        {TERMS_TEXT.warrantyDisclaimerText}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.liabilityTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.liabilitySummary}
      </div>
      <div className={`space-y-4 ${largeCaption} mb-8`}>
        {TERMS_TEXT.liabilityText}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.indemnityTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.indemnitySummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.indemnityText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.releaseTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.releaseSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.releaseText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.governingTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.governingSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`} id={'arbitration-agreement'}>
        {TERMS_TEXT.governingText}
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.arbitrationTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.arbitrationSummary}
      </div>
      <div className={`space-y-4 ${largeCaption} mb-8`}>
        {TERMS_TEXT.arbitrationTextCaps}
        <div className={`${p2Mobile} normal-case`}>
          {TERMS_TEXT.arbitrationTextRegular}
        </div>
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.generalTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.generalSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.generalText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.modificationsTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.modificationsSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>
        {TERMS_TEXT.modificationsText}
        <ul className="list-disc pl-4">
          {TERMS_TEXT.modificationsChangelog.map((change, index) => (
            <li key={index}>{change}</li>
          ))}
        </ul>
      </div>
      <div className={h4Mobile}>{TERMS_TEXT.electronicTitle}</div>
      <div className={`${lightBlueBox} mb-4 text-p2-mobile`}>
        {TERMS_TEXT.electronicSummary}
      </div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.electronicText}</div>
      <div className={h4Mobile}>{TERMS_TEXT.contactTitle}</div>
      <div className={`${p2Mobile} space-y-4`}>{TERMS_TEXT.contactText}</div>
    </div>
  );
};

export default TermsAndConditions;
