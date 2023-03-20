import HomeLayout from '@/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import AboutSection from '@/modules/home/aboutSection/AboutSection';
import Contact from '@/modules/home/contactSection/Contact';
import FAQS from '@/modules/home/faqSection/FAQS';
import Hero from '@/modules/home/heroSection/HeroSection';
import HowItWorks from '@/modules/home/howSection/HowItWorks';
import ForOrganizations from '@/modules/home/orgSection/forOrganizations';
import Testimonials from '@/modules/home/testimonialSection/Testimonials';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <HowItWorks />
      <ForOrganizations />
      <Testimonials />
      <FAQS sampleTextProp="FAQ TODO" />
      <Contact sampleTextProp="CONTACT TODO" />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
