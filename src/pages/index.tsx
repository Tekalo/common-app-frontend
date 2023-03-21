import HomeLayout from '@/components/layouts/home/HomeLayout';
import AboutSection from '@/components/modules/home/aboutSection/AboutSection';
import Contact from '@/components/modules/home/contactSection/Contact';
import FAQS from '@/components/modules/home/faqSection/faqSection';
import Hero from '@/components/modules/home/heroSection/HeroSection';
import HowItWorks from '@/components/modules/home/howSection/HowItWorks';
import ForOrganizations from '@/components/modules/home/orgSection/forOrganizations';
import Testimonials from '@/components/modules/home/testimonialSection/Testimonials';
import { NextPageWithLayout } from '@/lib/types';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <HowItWorks />
      <ForOrganizations />
      <Testimonials />
      <FAQS />
      <Contact sampleTextProp="CONTACT TODO" />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
