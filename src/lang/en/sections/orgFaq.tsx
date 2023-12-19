import { IFaqItem } from '@/lib/types';
import BasisTable from '@/modules/components/tables/BasisTable/BasisTable';
import { BASIS_TABLE_TEXT } from './tables';

export const ORG_FAQ_TEXT: Array<IFaqItem> = [
  {
    questionText:
      'What are Talent Connectors, Organizations, and Service Providers?',
    answerText: (
      <>
        <b>Talent Connectors</b> are entities who work with us to help review
        applications and connect individuals with Organizations that might be a
        good fit. <b>Organizations</b> are entities that are looking for
        talented individuals. <b>Service Providers</b> are vendors who provide
        services that support Tekalo such as web hosting, cloud services,
        analytics, and email marketing.
      </>
    ),
  },
  {
    questionText:
      'How do you decide which Organizations to share my info with?',
    answerText: (
      <>
        Talent Connectors from Schmidt Futures and our collaborating
        organizations, such as All Tech Is Human, US Digital Response, and Fast
        Forward, will review applications and identify potential candidates.
        They will then reach out to you to share those potential opportunities
        and seek your permission to make your info available to the relevant
        Organizations
      </>
    ),
  },
  {
    questionText: 'Do you show ads?',
    answerText: (
      <>
        We don’t show any ads on Tekalo! We only promote Tekalo itself via
        things like social media ads and email marketing, and we use tracking
        technologies such as cookies, pixels, and beacons to measure their
        performance.
      </>
    ),
  },
  {
    questionText: 'What rights do I have to respect to my data?',
    answerText: (
      <>
        We offer everyone the right to <b>delete</b> their data, <b>access</b> a
        copy of their data, <b>withdraw consent</b> to data processing,{' '}
        <b>object to</b> data processing, and <b>rectify</b>
        {
          " their data (correct inaccuracies or supplement incomplete info). For your protection, we have to verify your identity before taking action. Also, we can't always fully comply with a request, such as when doing so would reveal someone else's info, or when we're legally required to retain info. Candidates can submit a deletion request through their account settings. Organizations can reach out to "
        }
        <a
          href={'mailto:privacy@tekalo.org'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          privacy@Tekalo.org
        </a>
        {'. Please contact us at '}
        <a
          href={'mailto:privacy@tekalo.org'}
          className="cursor-pointer text-blue-1 underline underline-offset-4"
        >
          privacy@Tekalo.org
        </a>
        {
          ' to submit other requests or if you have any other data privacy questions.'
        }
      </>
    ),
  },
  {
    questionText: 'Where Is My Data Stored?',
    answerText: (
      <>
        All of our Talent Connectors and Service Providers who store data are
        located in the United States.
      </>
    ),
  },
  {
    questionText: 'What are your legal bases for processing?',
    answerText: (
      <>
        Please see below. Note that “Legitimate Interests” refers to something
        that (i) we think is desirable to us or someone else (including you),
        (ii) reasonably expected given the nature of our services, and (iii)
        doesn’t create any undue risk to you.
      </>
    ),
    extras: <BasisTable tableData={BASIS_TABLE_TEXT} />,
  },
];
