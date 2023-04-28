import HomeLayout from '@/lib/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import {
  AboutSection,
  ContactSection,
  FaqSection,
  HeroSection,
  HowSection,
  OrgSection,
  TestimonialSection,
} from '@/modules/sections/home';

const Home: NextPageWithLayout = () => {
  return (
    <div>
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
