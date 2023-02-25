import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import Head from 'next/head';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Head>
        <title>Schmidt Futures Common App</title>
        <meta name="description" content="Built by Schmidt Futures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">
          Schmidt Futures Common App
        </h1>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </main>
    </>
  );
}
