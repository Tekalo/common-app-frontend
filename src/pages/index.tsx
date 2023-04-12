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
    <div className="pt-16">
      <HeroSection />
      <button
        type="button"
        onClick={() => {
          throw new Error('Sentry Frontend Error');
        }}
      >
        Throw error
      </button>
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
