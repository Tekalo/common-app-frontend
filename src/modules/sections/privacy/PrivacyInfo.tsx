import Faq from '@/components/faq/Faq';
import ContentTable from '@/components/tables/ContentTable/ContentTable';
import {
  APPLICANT_CONTENT_TABLE_TEXT,
  CANDIDATE_FAQ_TEXT,
  ORG_CONTENT_TABLE_TEXT,
  ORG_FAQ_TEXT,
  PRIVACY_TEXT,
} from '@/lang/en';
import { useState } from 'react';

export interface IPrivacyInfo {}

const PrivacyInfo: React.FC<IPrivacyInfo> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  return (
    <div className="px-6 pb-28 md:pb-32">
      <div className="text-center">
        <h2 className="mt-10 font-display text-h2-mobile text-black-text lg:text-h2-desktop">
          {PRIVACY_TEXT.title}
        </h2>
      </div>

      <div className="-ml-6 mt-10 w-[calc(100%+48px)] overflow-hidden bg-light-blue pb-4 pl-6 md:pb-6 md:pl-0">
        <div className="mb-10 mt-2-mobile flex flex-row justify-center space-x-8 sm:space-x-10 md:mt-20 lg:mt-2-desktop">
          {PRIVACY_TEXT.toggleHeaders.map((header, i) => {
            return (
              <h4
                key={i}
                className={`cursor-pointer text-component-small transition-all sm:text-component-large md:text-h4-mobile lg:text-h4-desktop ${
                  (isForOrgsSelected && !i) || (!isForOrgsSelected && i)
                    ? 'text-gray-2 hover:text-blue-1'
                    : 'text-blue-1 underline underline-offset-8'
                }`}
                onClick={() => setForOrgs(header.includes('organizations'))}
              >
                {header}
              </h4>
            );
          })}
        </div>
        <ContentTable
          className={'w-full'}
          tableData={
            isForOrgsSelected
              ? APPLICANT_CONTENT_TABLE_TEXT
              : ORG_CONTENT_TABLE_TEXT
          }
        />
      </div>
      <h3 className="mt-16 text-center font-display text-h3-mobile lg:text-h3-desktop">
        {PRIVACY_TEXT.faq}
      </h3>
      <div className="m-auto mt-2-mobile max-w-content-area md:mt-2-tablet lg:mt-2-desktop">
        <Faq
          key={isForOrgsSelected ? 'orgFAQS' : 'candidateFAQS'}
          faqItems={isForOrgsSelected ? ORG_FAQ_TEXT : CANDIDATE_FAQ_TEXT}
        />
      </div>
    </div>
  );
};

export default PrivacyInfo;
