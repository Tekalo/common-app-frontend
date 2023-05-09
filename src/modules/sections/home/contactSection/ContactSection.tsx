import Button, { ButtonVariant } from '@/components/buttons/Button/Button';
import { HOME_CONTACT_TEXT } from '@/lang/en';
import { CONTACT_US_EMAIL_LINK } from '@/lib/constants/text';

export interface IContactSection {}

const ContactSection: React.FC<IContactSection> = () => {
  return (
    <section className="grid w-full place-items-center justify-center bg-blue-1 p-10 text-center align-middle md:py-14 lg:py-20">
      <div className="m-auto max-w-[618px] font-display text-white lg:max-w-[none]">
        <div className="mb-4 text-h2-mobile">{HOME_CONTACT_TEXT.header}</div>
        <div className="mb-6 text-h3-mobile md:mb-10 md:text-h3-mobile">
          {HOME_CONTACT_TEXT.body}
        </div>
        <div className="flex justify-center">
          <Button
            label={HOME_CONTACT_TEXT.cta}
            variant={ButtonVariant.OUTLINED}
            onClick={() => {
              window.open(CONTACT_US_EMAIL_LINK, '_blank');
            }}
            className="px-8 py-3"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
