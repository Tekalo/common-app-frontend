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
        <section>Navbar</section>
        <section>Hero</section>
        <section>About</section>
        <section>How-it-works</section>
        <section>For-organizations</section>
        <section>Testimonials</section>
        <section>FAQ</section>
        <section>Contact-Us</section>
        <section>Footer</section>
      </main>
    </>
  );
}
