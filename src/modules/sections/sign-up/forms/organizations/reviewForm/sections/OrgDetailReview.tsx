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
  const renderRow = (id: string, label: string, data?: string) =>
    data ? (
      <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-1">
        <span
          data-name={`label-${id}`}
          className="text-component-large text-black-text"
        >
          {label}
        </span>
        <span data-name={`value-${id}`}>{data}</span>
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
        {renderRow(
          'orgName',
          'Organization name: ',
          orgInfo?.organization.name
        )}
        {renderRow(
          'orgType',
          'Organization type: ',
          orgInfo?.organization.type
        )}
        {renderRow(
          'orgSize',
          'Organization size: ',
          orgInfo?.organization.size
        )}
        {renderRow(
          'orgImpactAreas',
          'Impact areas: ',
          orgInfo?.organization.impactAreas
            .map((area) => capitalizeFirstLetter(area))
            .join(', ')
        )}
        {orgInfo?.organization.impactAreasOther &&
          renderRow(
            'orgImpactAreasOther',
            'Other impact areas: ',
            orgInfo?.organization.impactAreasOther.join(', ')
          )}
      </div>
      <div className="mt-4 space-y-2">
        {renderRow('orgContactName', 'Contact name: ', orgInfo?.contact.name)}
        {renderRow(
          'orgContactPhone',
          'Contact number: ',
          orgInfo?.contact.phone
        )}
        {renderRow(
          'orgContactEmail',
          'Contact email: ',
          orgInfo?.contact.email
        )}
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
