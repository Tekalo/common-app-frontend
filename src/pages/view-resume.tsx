import { ERROR_TEXT } from '@/lang/en/en';
import { redirectCookieName } from '@/lib/constants/strings';
import { get } from '@/lib/helpers/api/apiHelpers';
import { applicantResumeEndpoint } from '@/lib/helpers/api/endpoints';
import { CookiesContext } from '@/lib/providers/cookiesProvider';
import { NextPageWithLayout } from '@/lib/types';
import LoadingSpinner from '@/modules/components/loadingSpinner/LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

interface IResumeFetchResponse {
  id: number;
  signedLink: string;
}

const ViewResumePage: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const cookiesCtx = useContext(CookiesContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const applicantId = router.query.applicantId;

    if (isAuthenticated && !isLoading) {
      if (applicantId && typeof applicantId === 'string') {
        fetchResumeUrl(applicantId);
      } else {
        setErrorMessage(ERROR_TEXT.noApplicantId);
      }
    } else if (!isAuthenticated && !isLoading) {
      cookiesCtx.set(redirectCookieName, window.location.href);
      router.push('sign-in');
    }
  }, [isAuthenticated, isLoading]);

  const fetchResumeUrl = async (applicantId: string) => {
    const token = await getAccessTokenSilently();
    const url = applicantResumeEndpoint.replace(':id', applicantId);

    return get(url, token)
      .then(async (res) => {
        if (res.status === 200) {
          const resBody = (await res.json()) as IResumeFetchResponse;
          router.push(resBody.signedLink);
        } else if (res.status === 404) {
          setErrorMessage(ERROR_TEXT.resumeNotFound);
        } else {
          setErrorMessage(ERROR_TEXT.resumeFetchFailed);
        }
      })
      .catch(() => {
        setErrorMessage(ERROR_TEXT.resumeFetchFailed);
      });
  };

  const getContent = () => {
    if (errorMessage) {
      return <p id="view-resume-error">{errorMessage}</p>;
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

export default ViewResumePage;

ViewResumePage.getLayout = (page) => {
  return <>{page}</>;
};
