import HomeLayout from '@/components/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import AboutSection from '@/modules/home/aboutSection/AboutSection';
import Hero from '@/modules/home/heroSection/HeroSection';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
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
