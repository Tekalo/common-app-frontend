import { ACCOUNT_LINK, BASE_LINK } from '@/lang/en';
import { applicantSubmissionsEndpoint, get } from '@/lib/helpers/apiHelpers';
import { NextPageWithLayout, SubmissionResponseType } from '@/lib/types';
import LoadingSpinner from '@/modules/components/loadingSpinner/LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignInActionPage: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    const goHome = () => {
      router.push(BASE_LINK);
    };

    const handleSuccess = async (res: Response) => {
      const submissionResponse = (await res.json()) as SubmissionResponseType;

      if (submissionResponse.isFinal) {
        goHome();
      } else {
        router.push(ACCOUNT_LINK);
      }
    };

    const signInRedirect = async () => {
      get(applicantSubmissionsEndpoint, await getAccessTokenSilently())
        .then(async (res) => {
          if (res.ok) {
            handleSuccess(res);
          } else {
            goHome();
          }
        })
        .catch(() => {
          goHome();
        });
    };

    if (!isLoading && isAuthenticated) {
      signInRedirect();
    }
  }, [isLoading, isAuthenticated, getAccessTokenSilently, router]);

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default SignInActionPage;

SignInActionPage.getLayout = (page) => {
  return <>{page}</>;
};
