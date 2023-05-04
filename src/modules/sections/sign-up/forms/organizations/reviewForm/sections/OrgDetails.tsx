import { EditSVG } from '@/lib/constants/svgs';
import { capitalizeFirstLetter } from '@/lib/helpers/formHelpers';
import { NewOrgType } from '@/lib/types';

export interface IOrgDetails {
  titleText: string;
  orgInfo: NewOrgType | undefined;
}

const OrgDetails: React.FC<IOrgDetails> = ({ titleText, orgInfo }) => {
  return (
    <div className="mt-12 border-b border-b-gray-3 pb-8">
      <div className="font-dispay text-h4-desktop text-black-text">
        {titleText}
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
          // TODO: Send me back to the form contact stuff!
          console.log('Send me back to the form contact stuff!');
        }}
      >
        <div>{'Edit contact and organization'}</div>
        <div>{EditSVG}</div>
      </div>
    </div>
  );
};

export default OrgDetails;
