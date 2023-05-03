import { EditSVG } from '@/lib/constants/svgs';
import { capitalizeFirstLetter } from '@/lib/helpers/formHelpers';
import { NewOrgType, NewRoleType } from '@/lib/types';
import Faq from '@/modules/components/faq/Faq';

export interface IOrgReviewPage {
  orgInfo: NewOrgType | undefined;
  orgRoles: NewRoleType[];
}

const OrgReviewPage: React.FC<IOrgReviewPage> = ({ orgInfo, orgRoles }) => {
  return (
    <div className="mx-6 mt-16 w-full sm:mx-40">
      {/* Header */}
      <div className="mx-auto text-center font-display text-h3-desktop text-black-text">
        {'Review your intake form'}
      </div>
      {/* Org Info */}
      <div className="mt-12">
        <div className="font-dispay text-h4-desktop text-black-text">
          {'Contact and organization'}
        </div>
        <div className="mt-6 space-y-2">
          <div>
            <span className="text-component-large text-black-text">
              {'Organization name: '}
            </span>
            {orgInfo?.organization.name}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Organization type: '}
            </span>
            {orgInfo?.organization.type}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Organization size: '}
            </span>
            {orgInfo?.organization.size}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Impact areas: '}
            </span>
            {orgInfo?.organization.impactAreas
              .map((area) => capitalizeFirstLetter(area))
              .join(', ')}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div>
            <span className="text-component-large text-black-text">
              {'Contact name: '}
            </span>
            {orgInfo?.contact.name}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Contact number: '}
            </span>
            {orgInfo?.contact.phone}
          </div>
          <div>
            <span className="text-component-large text-black-text">
              {'Contact email: '}
            </span>
            {orgInfo?.contact.email}
          </div>
        </div>
        <div
          className="mt-6 flex cursor-pointer flex-row space-x-2 align-middle text-component-small text-blue-1"
          onClick={() => {
            console.log('Send me back to the form contact stuff!');
          }}
        >
          <div>{'Edit contact and organization'}</div>
          <div>{EditSVG}</div>
        </div>
      </div>
      {/* Roles */}
      <Faq
        className=""
        faqItems={[
          {
            questionText: 'What is the role of the board?',
            answerText:
              'The board is responsible for the governance of the organization. This includes setting the strategic direction, ensuring the organization has the resources it needs to operate, and overseeing the organization’s activities.',
          },
          {
            questionText: 'What is the role of the board?',
            answerText:
              'The board is responsible for the governance of the organization. This includes setting the strategic direction, ensuring the organization has the resources it needs to operate, and overseeing the organization’s activities.',
          },
        ]}
      />
    </div>
  );
};

export default OrgReviewPage;
