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
} from '@/sections/home';
import { useState } from 'react';

const Home: NextPageWithLayout = () => {
  const [showLogoModal, setShowLogoModal] = useState(false);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <HowSection />
      <OrgSection
        showLogoModal={showLogoModal}
        setShowLogoModal={setShowLogoModal}
      />
      <TestimonialSection />
      <FaqSection setShowLogoModal={setShowLogoModal} />
      <ContactSection />
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};
