import { ORG_FORM_TEXT } from '@/lang/en/en';
import { LightBulbInfoSVG } from '@/lib/constants/svgs';
import { ReactElement } from 'react';

const OrgAdditionalInfoBox: React.FC = () => {
  const InfoRow: React.FC<{ content: ReactElement }> = ({ content }) => (
    <div className="flex gap-x-2">
      <div className="flex">
        <LightBulbInfoSVG />
      </div>
      <div className="text-component-small">{content}</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4 bg-light-orange px-2 py-6 md:px-4">
      <InfoRow content={ORG_FORM_TEXT.INFO.chat} />
      <InfoRow content={ORG_FORM_TEXT.INFO.non_commit} />
    </div>
  );
};

export default OrgAdditionalInfoBox;
