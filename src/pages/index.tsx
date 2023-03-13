import HomeLayout from '@/components/layouts/home/HomeLayout';
import Hero from '@/components/modules/hero/Hero';
import { NextPageWithLayout } from '@/lib/types';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Hero />
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
