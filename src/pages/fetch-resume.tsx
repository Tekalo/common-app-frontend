import { ERROR_TEXT } from '@/lang/en';
import { applicantResumeEndpoint, get } from '@/lib/helpers/apiHelpers';
import { NextPageWithLayout } from '@/lib/types';
import LoadingSpinner from '@/modules/components/loadingSpinner/LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FetchResumePage: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const router = useRouter();
  const [presignedURL, setPresignedUrl] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const applicantId = router.query.applicantId;

    if (isAuthenticated && !isLoading) {
      if (applicantId && typeof applicantId === 'string') {
        fetchResumeUrl(applicantId);
      } else {
        setErrorMessage(ERROR_TEXT.noApplicantId);
      }
    }
  }, [isAuthenticated, isLoading]);

  const fetchResumeUrl = async (applicantId: string) => {
    const token = await getAccessTokenSilently();
    const url = applicantResumeEndpoint.replace(':id', applicantId);

    return get(url, token).then(async (res) => {
      const resBody = await res.json();

      setPresignedUrl(resBody.signedLink);
    });
  };

  const getContent = () => {
    if (errorMessage) {
      return <p>{errorMessage}</p>;
    } else if (presignedURL?.length) {
      return (
        <a
          className="group flex h-12 min-w-[118px] flex-row content-center items-center justify-center
          rounded bg-blue-1 px-4 font-sans
          text-component-large text-white transition-colors
          hover:bg-blue-2 focus-visible:ring-2
          focus-visible:ring-[#A7C4DB] active:border-blue-3 active:bg-blue-3
          disabled:cursor-not-allowed disabled:border-blue-4 disabled:bg-blue-4  disabled:text-white"
          href={presignedURL}
          rel="noreferrer"
          target="_blank"
          download="resume.pdf"
        >
          Download resume
        </a>
      );
    } else {
      return <LoadingSpinner />;
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      {getContent()}
    </div>
  );
};

export default FetchResumePage;

FetchResumePage.getLayout = (page) => {
  return <>{page}</>;
};
