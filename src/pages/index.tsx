import HomeLayout from '@/components/layouts/home/HomeLayout';
import AboutSection from '@/components/modules/home/aboutSection/AboutSection';
import ContactSection from '@/components/modules/home/contactSection/ContactSection';
import FaqSection from '@/components/modules/home/faqSection/FaqSection';
import HeroSection from '@/components/modules/home/heroSection/HeroSection';
import HowSection from '@/components/modules/home/howSection/HowSection';
import OrgSection from '@/components/modules/home/orgSection/OrgSection';
import TestimonialSection from '@/components/modules/home/testimonialSection/TestimonialSection';
import { NextPageWithLayout } from '@/lib/types';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <HowSection />
      <OrgSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection sampleTextProp="CONTACT TODO" />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
