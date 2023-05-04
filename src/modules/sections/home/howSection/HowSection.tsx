import Timeline from '@/components/timeline/Timeline';
import { ITimelineItem } from '@/lib/types';
import { useState } from 'react';

export interface IHowSection {}

const HowSection: React.FC<IHowSection> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  // Store the titems that the component should conditionally render
  const orgItems: Array<ITimelineItem> = [
    {
      title: 'Submit an opportunity',
      content:
        'Share open tech-related opportunities (part-time or full-time) at your organization using one simple application. Next, your assigned Talent Connector reviews your application to make sure that it’s a good fit.',
    },
    {
      title: 'Intro call',
      content:
        'Next, your assigned Talent Connector works with you to further define your ideal candidate profile.',
    },
    {
      title: 'Connect with your matched candidates',
      content:
        'Your Talent Connector will identify interested candidates and share their profiles. If it’s a good match, you will be introduced to the candidates!',
    },
  ];

  const candidateItems: Array<ITimelineItem> = [
    {
      title: 'Submit a single application',
      content:
        'Tell us about your experience and interests by submitting the Tekalo application.',
    },
    {
      title: 'Receive a list of potential matches',
      content:
        'Your assigned Talent Connector reviews your application and matches you with opportunities at impact-driven organizations that best fit your interests and profile. You will continue to receive potential matches, if available, every few weeks until you get hired or opt out of Tekalo.',
    },
    {
      title: 'Intro call',
      content:
        'Next, your Talent Connector will schedule a one-time call to share more information about your potential matches and ask you additional questions about your experience and interests.',
    },
    {
      title: 'Connect to your matched organizations',
      content:
        'Your Talent Connector will share your profile with the organization(s) that you agree to be connected to. If mutual, your Talent Connector will make an introduction!',
    },
  ];

  const toggleHeaders = ['For candidates', 'For organizations'];

  return (
    <section className="grid w-full place-items-center bg-light-blue">
      <div className="px-6 py-14 md:px-24 md:py-16 lg:py-28">
        {/* Title */}
        <div className="text-center font-display text-h3-mobile text-black-text lg:text-h2-desktop">
          How it works
        </div>
        {/* Toggle Menu */}
        {/* TODO: Move the toggle menu into its own component, this is identical to FAQ */}
        <div className="mt-6 flex flex-row justify-center space-x-6 md:space-x-8 lg:mt-12 lg:space-x-12">
          {toggleHeaders.map((header, i) => (
            <div
              key={i}
              className={`cursor-pointer text-component-large transition-all md:text-h4-mobile lg:text-h4-desktop ${
                (isForOrgsSelected && !i) || (!isForOrgsSelected && i)
                  ? 'text-gray-2'
                  : 'text-blue-1 underline underline-offset-8'
              }`}
              onClick={() => setForOrgs(header.includes('organizations'))}
            >
              {header}
            </div>
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
