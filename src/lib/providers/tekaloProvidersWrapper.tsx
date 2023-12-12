import ApplicantProvider from '@/providers/applicantProvider';
import CookiesProvider from '@/providers/cookiesProvider';
import DebugProvider from '@/providers/debugProvider';
import FileUploadProvider from '@/providers/fileUploadProvider/fileUploadProvider';
import GTMProvider from '@/providers/gtmProvider/gtmProvider';
import SubmissionProvider from '@/providers/submissionProvider';
import { ReactNode } from 'react';

interface ITekaloProvidersWrapper {
  children: ReactNode;
}

const TekaloProvidersWrapper: React.FC<ITekaloProvidersWrapper> = ({
  children,
}) => (
  // GTMProvider needs CookiesProvider
  <ApplicantProvider>
    <CookiesProvider>
      <DebugProvider>
        <FileUploadProvider>
          <GTMProvider>
            <SubmissionProvider>
              {/* TODO: Commenting this out for now because it keeps making requests
               <SkillsSearchProvider> */}
              {children}
              {/* </SkillsSearchProvider> */}
            </SubmissionProvider>
          </GTMProvider>
        </FileUploadProvider>
      </DebugProvider>
    </CookiesProvider>
  </ApplicantProvider>
);

export default TekaloProvidersWrapper;
