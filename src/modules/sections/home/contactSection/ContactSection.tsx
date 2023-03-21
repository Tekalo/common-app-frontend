import Button from '@/components/buttons/Button/Button';

export interface IContactSection {}

const ContactSection: React.FC<IContactSection> = () => {
  return (
    <section className="grid w-full place-items-center justify-center bg-blue-1 text-center align-middle">
      <div className="py-16 font-display text-white">
        <div className="text-h2-desktop">Get in touch</div>
        <div className="pt-4 text-h3-desktop">
          We want to hear from you and answer your questions
        </div>
        <div className="flex justify-center pt-10">
          <Button
            label="Contact us"
            outlined={true}
            onClick={() => {}}
            className="px-8 py-3"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
