import { APPLICANT_EXPERIENCE_FORM_TEXT } from '@/lang/en';
import { SkillsSelectValidator } from '@/lib/enums';
import { NextPageWithLayout } from '@/lib/types';
import SkillsSelectField from '@/modules/sections/sign-up/fields/SkillsSelectField';

// TODO: Temporary testing page, remove
const TestPage: NextPageWithLayout = () => {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <div className="m-auto mt-8 w-screen max-w-[344px] md:mt-10 lg:mt-8">
        <SkillsSelectField
          fieldName="skillsSelect"
          label={APPLICANT_EXPERIENCE_FORM_TEXT.FIELDS.skillsSelect.label}
          isSubmitted={false}
          validator={SkillsSelectValidator}
          initialValue={[]}
        />
      </div>
    </div>
  );
};

export default TestPage;

TestPage.getLayout = (page) => {
  return <>{page}</>;
};
