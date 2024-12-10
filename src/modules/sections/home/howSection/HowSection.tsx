import Timeline from '@/components/timeline/Timeline';
import { HOME_FAQ_TEXT, HOME_HOW_TEXT } from '@/lang/en/en';
import { ITimelineItem } from '@/lib/types';
import { useState } from 'react';

const HowSection: React.FC = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  // Store the titems that the component should conditionally render
  const orgItems: Array<ITimelineItem> = [
    {
      title: HOME_HOW_TEXT.ORG_TITLE_1,
      content: HOME_HOW_TEXT.ORG_CONTENT_1,
    },
    {
      title: HOME_HOW_TEXT.ORG_TITLE_2,
      content: HOME_HOW_TEXT.ORG_CONTENT_2,
    },
    {
      title: HOME_HOW_TEXT.ORG_TITLE_3,
      content: HOME_HOW_TEXT.ORG_CONTENT_3,
    },
  ];

  const candidateItems: Array<ITimelineItem> = [
    {
      title: HOME_HOW_TEXT.CANDIDATE_TITLE_1,
      content: HOME_HOW_TEXT.CANDIDATE_CONTENT_1,
    },
    {
      title: HOME_HOW_TEXT.CANDIDATE_TITLE_2,
      content: HOME_HOW_TEXT.CANDIDATE_CONTENT_2,
    },
    {
      title: HOME_HOW_TEXT.CANDIDATE_TITLE_3,
      content: HOME_HOW_TEXT.CANDIDATE_CONTENT_3,
    },
    {
      title: HOME_HOW_TEXT.CANDIDATE_TITLE_4,
      content: HOME_HOW_TEXT.CANDIDATE_CONTENT_4,
    },
  ];

  const toggleHeaders = [
    HOME_FAQ_TEXT.CANDIDATE_TOGGLE,
    HOME_FAQ_TEXT.ORG_TOGGLE,
  ];

  return (
    <section
      id="landing_how"
      className="grid w-full scroll-mt-14 place-items-center bg-light-blue md:scroll-mt-16 lg:scroll-mt-20"
    >
      <div className="px-6 py-14 md:px-24 md:py-16 lg:py-28">
        {/* Title */}
        <h2 className="text-center font-display text-h3-mobile text-black-text lg:text-h2-desktop">
          {HOME_HOW_TEXT.TITLE}
        </h2>
        {/* Toggle Menu */}
        {/* TODO: Move the toggle menu into its own component, this is identical to FAQ */}
        <div className="mt-6 flex flex-row justify-center space-x-6 md:space-x-8 lg:mt-12 lg:space-x-12">
          {toggleHeaders.map((header, i) => (
            <h4
              key={i}
              className={`cursor-pointer text-component-large transition-all md:text-h4-mobile lg:text-h4-desktop ${
                (isForOrgsSelected && !i) || (!isForOrgsSelected && i)
                  ? 'text-gray-2 hover:text-blue-1'
                  : 'text-blue-1 underline underline-offset-8'
              }`}
              onClick={() => setForOrgs(header.includes('organizations'))}
            >
              {header}
            </h4>
          ))}
        </div>
        {/* Timeline Component */}
        <div className="m-auto max-w-[695px]">
          <Timeline
            timelineItems={isForOrgsSelected ? orgItems : candidateItems}
          />
        </div>
      </div>
    </section>
  );
};

export default HowSection;
