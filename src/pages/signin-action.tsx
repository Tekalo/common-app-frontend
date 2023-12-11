import { ACCOUNT_LINK, BASE_LINK } from '@/lang/en';
import { redirectCookieName } from '@/lib/constants/strings';
import { CookiesContext } from '@/lib/providers/cookiesProvider';
import { SubmissionContext } from '@/lib/providers/submissionProvider';
import { NextPageWithLayout, SubmissionResponseType } from '@/lib/types';
import LoadingSpinner from '@/modules/components/loadingSpinner/LoadingSpinner';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { QueryClient } from 'react-query';

const SignInActionPage: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const cookiesCtx = useContext(CookiesContext);
  const submissionCtx = useContext(SubmissionContext);
  const { data: submissionData, isLoading: submissionIsLoading } =
    submissionCtx.useSubmission();
  const router = useRouter();
  const queryClient = new QueryClient();

  useEffect(() => {
    // New sign-in, so we want to invalidate caching if they were previously signed in
    queryClient.invalidateQueries();
  }, []);

  useEffect(() => {
    const goHome = () => {
      router.push(BASE_LINK);
    };

    const handleSuccess = async (res: SubmissionResponseType) => {
      if (res.isFinal) {
        goHome();
      } else {
        router.push(ACCOUNT_LINK);
      }
    };

    const signInRedirect = async () => {
      const redirectURL = cookiesCtx.get(redirectCookieName);

      if (redirectURL) {
        cookiesCtx.remove(redirectCookieName);
        router.push(redirectURL);
      } else if (submissionData) {
        handleSuccess(submissionData);
      } else {
        goHome();
      }
    };

    if (!isLoading && isAuthenticated && !submissionIsLoading) {
      signInRedirect();
    }
  }, [
    cookiesCtx,
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    router,
    submissionData,
    submissionIsLoading,
  ]);

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
