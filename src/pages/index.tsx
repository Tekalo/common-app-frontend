import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import AboutSection from '@/sections/home/aboutSection/AboutSection';
import ContactSection from '@/sections/home/contactSection/ContactSection';
import FaqSection from '@/sections/home/faqSection/FaqSection';
import HeroSection from '@/sections/home/heroSection/HeroSection';
import HowSection from '@/sections/home/howSection/HowSection';
import OrgSection from '@/sections/home/orgSection/OrgSection';
import TestimonialSection from '@/sections/home/testimonialSection/TestimonialSection';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          throw new Error('An error unlike all the previous errors');
        }}
      >
        Throw error
      </button>{' '}
      <HeroSection />
      <AboutSection />
      <HowSection />
      <OrgSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
