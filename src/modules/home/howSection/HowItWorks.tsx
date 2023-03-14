import { ITimelineItem } from '@/lib/types';
import { useState } from 'react';

export interface IHowItWorks {}

/**
 * Likely will make a reusable component from (https://tailwind-elements.com/docs/standard/components/timeline/#basic)
 *
 * After that this one should call that component and pass a list of items. Each item should have: {label: string, title: string, text: string}
 *
 * The child component will render a new timeline item with each of these passed in
 *
 * This component will also actually render TWO of those components - one for organizations and the other for candidates.
 *
 * // TODO: Create Timeline component (see above)
 * // TODO: Create toggle component (two link nav basically)
 * // TODO: useState for current toggle w/ conditional render
 *
 * Maybe use one timeline component but conditionally pass in different arrays of items? That sounds like a better move...
 */
const HowItWorks: React.FC<IHowItWorks> = () => {
  const [forOrgs, setForOrgs] = useState(false);

  // Store the titems that the component should conditionally render
  const orgItems: Array<ITimelineItem> = [
    { title: 'Hello Organizations', text: 'Lorem Ipsum' },
  ];
  const candidateItems: Array<ITimelineItem> = [
    { title: 'Hello Candidates', text: 'Lorem Ipsum' },
  ];

  return (
    <section className="grid w-full place-items-center">
      <div className="bg-light-blue-bg desktop:h-[1086px] desktop:w-[1440px]">
        {/* Title */}
        <div className="pt-24 text-center font-display text-desktop-h3 text-black-text">
          How it works
        </div>
        {/* Toggle Menu */}
        <div className="flex flex-row justify-center space-x-10 pt-12">
          <div
            className={`cursor-pointer text-desktop-h4 transition-all ${
              forOrgs
                ? 'text-gray-2-darker'
                : 'text-blue-1-primary underline underline-offset-8'
            }`}
            onClick={() => setForOrgs(false)}
          >
            For candidates
          </div>
          <div
            className={`cursor-pointer text-desktop-h4 transition-all ${
              forOrgs
                ? 'text-blue-1-primary underline underline-offset-8'
                : 'text-gray-2-darker'
            }`}
            onClick={() => setForOrgs(true)}
          >
            For organizations
          </div>
        </div>
        {/* Timeline Component */}
        <div className="justify-center px-80 py-14 text-center align-middle">
          {forOrgs ? orgItems[0].title : candidateItems[0].title}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
