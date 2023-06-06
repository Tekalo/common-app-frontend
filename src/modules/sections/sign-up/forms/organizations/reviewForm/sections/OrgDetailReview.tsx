import { EditSVG } from '@/lib/constants/svgs';
import { capitalizeFirstLetter } from '@/lib/helpers/formHelpers';
import { NewOrgType } from '@/lib/types';

export interface IOrgDetailReview {
  titleText: string;
  orgInfo: NewOrgType | undefined;
  handleGoToOrg: () => void;
}

const OrgDetailReview: React.FC<IOrgDetailReview> = ({
  titleText,
  orgInfo,
  handleGoToOrg: handleEditOrg,
}) => {
  const renderRow = (label: string, data?: string) =>
    data ? (
      <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-1">
        <span className="text-component-large text-black-text">{label}</span>
        <span className="">{data}</span>
      </div>
    ) : (
      <></>
    );

  return (
    <div className="mt-8 border-b border-b-gray-3 pb-4">
      <h4 className="font-display text-h4-mobile text-black-text lg:text-h4-desktop">
        {titleText}
      </h4>
      <div className="mt-4 space-y-2 md:mt-6">
        {renderRow('Organization name: ', orgInfo?.organization.name)}
        {renderRow('Organization type: ', orgInfo?.organization.type)}
        {renderRow('Organization size: ', orgInfo?.organization.size)}
        {renderRow(
          'Impact areas: ',
          orgInfo?.organization.impactAreas
            .map((area) => capitalizeFirstLetter(area))
            .join(', ')
        )}
      </div>
      <div className="mt-4 space-y-2">
        {renderRow('Contact name: ', orgInfo?.contact.name)}
        {renderRow('Contact number: ', orgInfo?.contact.phone)}
        {renderRow('Contact email: ', orgInfo?.contact.email)}
      </div>
      <div
        className="mt-6 flex cursor-pointer flex-row space-x-2 align-middle text-component-small text-blue-1"
        onClick={handleEditOrg}
      >
        <div>{'Edit contact and organization'}</div>
        <div>{EditSVG}</div>
      </div>
    </div>
  );
};

export default OrgDetailReview;
