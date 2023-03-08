import HomeLayout from '@/components/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';

const Home: NextPageWithLayout = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <section>Navbar</section>
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
