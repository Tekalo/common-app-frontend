import Timeline from '@/components/timeline/Timeline';
import { ITimelineItem } from '@/lib/types';
import { useState } from 'react';

export interface IHowSection {}

const HowSection: React.FC<IHowSection> = () => {
  const [isForOrgsSelected, setForOrgs] = useState(false);

  // Store the titems that the component should conditionally render
  const orgItems: Array<ITimelineItem> = [
    {
      title: 'Lorem ipsum dolor',
      text: 'In sit amet lectus elit. Vivamus nisl eros, egestas eu lorem sed, tempor imperdiet dolor. Etiam fermentum ipsum quis malesuada maximus. Maecenas ut sapien ac mauris porta tincidunt. Vestibulum eleifend blandit dapibus. Proin tempus tincidunt nibh imperdiet tristique. Donec eu dictum magna. Maecenas sed auctor dolor.',
    },
    {
      title: 'Lorem ipsum dolor',
      text: 'In sit amet lectus elit. Vivamus nisl eros, egestas eu lorem sed, tempor imperdiet dolor. Etiam fermentum ipsum quis malesuada maximus. Maecenas ut sapien ac mauris porta tincidunt. Vestibulum eleifend blandit dapibus. Proin tempus tincidunt nibh imperdiet tristique. Donec eu dictum magna. Maecenas sed auctor dolor.',
    },
    {
      title: 'Lorem ipsum dolor',
      text: 'In sit amet lectus elit. Vivamus nisl eros, egestas eu lorem sed, tempor imperdiet dolor. Etiam fermentum ipsum quis malesuada maximus. Maecenas ut sapien ac mauris porta tincidunt. Vestibulum eleifend blandit dapibus. Proin tempus tincidunt nibh imperdiet tristique. Donec eu dictum magna. Maecenas sed auctor dolor.',
    },
    {
      title: 'Lorem ipsum dolor',
      text: 'In sit amet lectus elit. Vivamus nisl eros, egestas eu lorem sed, tempor imperdiet dolor. Etiam fermentum ipsum quis malesuada maximus. Maecenas ut sapien ac mauris porta tincidunt. Vestibulum eleifend blandit dapibus. Proin tempus tincidunt nibh imperdiet tristique. Donec eu dictum magna. Maecenas sed auctor dolor.',
    },
  ];

  const candidateItems: Array<ITimelineItem> = [
    {
      title: 'Submit a single application',
      text: 'Your application will be viewed by a matchmaker from the team to be considered for opportunities by over XX,000 employers and organizations. In the application, we can learn more about what causes you’re interested in, and your preferences in the organizations that fit you best.',
    },
    {
      title: 'Receive your matches',
      text: 'After 3-5 weeks, your assigned matchmaker send you the right opportunities that fit your interests and experience. This is a rolling process and we’ll send you matches until you opt-out or get hired!',
    },
    {
      title: 'Screening and info call',
      text: 'Connect with your matchmaker for a screening and info call. This is an introductory call that usually takes less than 20 minutes to get on the same page and answer questions.',
    },
    {
      title: 'Connect to your matched organizations',
      text: 'Tell us the matches that looks good to you, and we’ll connect you.  Your matchmaker will only introduce you to the organizations that you decide you’re interested in.',
    },
  ];

  const toggleHeaders = ['For candidates', 'For organizations'];

  return (
    <section className="grid w-full place-items-center bg-light-blue">
      <div className="px-6 py-14 md:px-24 md:py-16 lg:py-24">
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
        <Timeline
          timelineItems={isForOrgsSelected ? orgItems : candidateItems}
        />
      </div>
    </section>
  );
};

export default HowSection;
