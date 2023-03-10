import HomeLayout from '@/components/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';

const Home: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <Link href="/privacy-info">
        <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Go to Privacy Info
        </button>
      </Link>
      <section>Hero</section>
      <section>About</section>
      <section>How-it-works</section>
      <section>For-organizations</section>
      <section>Testimonials</section>
      <section>FAQ</section>
      <section>Contact-Us</section>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
