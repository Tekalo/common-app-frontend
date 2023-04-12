import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the base URL
    router.push('/');
  });

  return null; // You can return any custom UI for the error page if desired
};

export default Custom404;
