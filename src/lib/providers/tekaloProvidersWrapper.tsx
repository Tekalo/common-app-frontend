import ApplicantProvider from '@/providers/applicantProvider';
import DebugProvider from '@/providers/debugProvider';
import FileUploadProvider from '@/providers/fileUploadProvider/fileUploadProvider';
import GTMProvider from '@/providers/gtmProvider/gtmProvider';
import SkillsSearchProvider from '@/providers/skillsSearchProvider';
import SubmissionProvider from '@/providers/submissionProvider';
import { ReactNode } from 'react';

interface ITekaloProvidersWrapper {
  children: ReactNode;
}

const TekaloProvidersWrapper: React.FC<ITekaloProvidersWrapper> = ({
  children,
}) => (
  <GTMProvider>
    <DebugProvider>
      <ApplicantProvider>
        <SubmissionProvider>
          <FileUploadProvider>
            <SkillsSearchProvider>{children}</SkillsSearchProvider>
          </FileUploadProvider>
        </SubmissionProvider>
      </ApplicantProvider>
    </DebugProvider>
  </GTMProvider>
);

export default TekaloProvidersWrapper;
