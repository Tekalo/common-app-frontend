import HomeLayout from '@/components/layouts/home/HomeLayout';
import Hero from '@/components/modules/hero/Hero';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Link href="/privacy-info">Privacy info</Link>
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
