import HomeLayout from '@/lib/layouts/home/HomeLayout';
import { NextPageWithLayout } from '@/lib/types';
import Button from '@/modules/components/buttons/Button/Button';
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
      <Button
        label="Test Error"
        onClick={() => {
          throw 'test error';
        }}
      />
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
