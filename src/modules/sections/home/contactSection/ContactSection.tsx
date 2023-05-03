import Button, { ButtonVariant } from '@/components/buttons/Button/Button';

export interface IContactSection {}

const ContactSection: React.FC<IContactSection> = () => {
  return (
    <section className="grid w-full place-items-center justify-center bg-blue-1 p-10 text-center align-middle">
      <div className="font-display text-white">
        <div className="mb-4 text-h2-mobile">Get in touch</div>
        <div className="mb-6 text-h3-mobile md:mb-10 md:text-h3-mobile">
          We want to hear from you and answer your questions
        </div>
        <div className="flex justify-center">
          <Button
            label="Contact us"
            variant={ButtonVariant.OUTLINED}
            onClick={() => void {}}
            className="px-8 py-3"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
