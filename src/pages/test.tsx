import { NextPageWithLayout } from '@/lib/types';
import SkillsSelect from '@/modules/components/input/skillsSelect/skillsSelect';
import { useState } from 'react';

// TODO: Temporary testing page, remove
const TestPage: NextPageWithLayout = () => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <div className="m-auto mt-8 w-screen max-w-[344px] md:mt-10 lg:mt-8">
        <SkillsSelect value={value} setValue={setValue} />
      </div>
    </div>
  );
};

export default TestPage;

TestPage.getLayout = (page) => {
  return <>{page}</>;
};
