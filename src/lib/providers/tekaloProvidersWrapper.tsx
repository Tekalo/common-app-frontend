import { ReactNode } from 'react';
import ApplicantProvider from './applicantProvider';
import DebugProvider from './debugProvider';
import FileUploadProvider from './fileUploadProvider/fileUploadProvider';
import GTMProvider from './gtmProvider/gtmProvider';
import SkillsSearchProvider from './skillsSearchProvider';
import SubmissionProvider from './submissionProvider';

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
