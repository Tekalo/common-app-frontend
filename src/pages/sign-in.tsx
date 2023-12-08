import { NextPageWithLayout } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const SignInPage: NextPageWithLayout = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, []);

  return <></>;
};

export default SignInPage;

SignInPage.getLayout = (page) => {
  return <>{page}</>;
};
