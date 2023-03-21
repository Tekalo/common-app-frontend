import Button from '@/components/buttons/Button/Button';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export interface IOrganizationSection {}

// TODO: Replace images with next/image --> figure out cloudflare + next/image

const OrganizationSection: React.FC<IOrganizationSection> = () => {
  return (
    <section className="grid w-full place-items-center pt-24 pb-28">
      <div className="min-w-full px-40">
        {/* Title */}
        <div className="text-center text-small-caption-desktop uppercase text-gray-1">
          Organizations that recruit though [name]
        </div>
        {/* Logo Grid */}
        <div className="px-24">
          <div className="flex flex-row items-center justify-between pt-10">
            <img
              src="/images/logos/FreeWorldLogo.png"
              alt="Free World Logo"
              className="h-8 object-cover"
            />
            <img
              src="/images/logos/RebootLogo.png"
              alt="Reboot RX Logo"
              className="h-8 object-cover"
            />
            <img
              src="/images/logos/TMLogo.png"
              alt="Tech Matters Logo"
              className="h-12 object-cover"
            />
            <img
              src="/images/logos/RecidLogo.png"
              alt="Recidiviz Logo"
              className="h-18 object-cover"
            />
          </div>
          <div className="flex flex-row items-center justify-evenly">
            <img
              src="/images/logos/PlaceHolderLogo.png"
              alt="Placeholder"
              className="h-16 object-cover"
            />
            <img
              src="/images/logos/PlaceHolderLogo.png"
              alt="Placeholder"
              className="h-16 object-cover"
            />
            <img
              src="/images/logos/PlaceHolderLogo.png"
              alt="Placeholder"
              className="h-16 object-cover"
            />
          </div>
          <div className="space-x-o flex cursor-pointer flex-row items-center justify-center pt-14 text-center align-middle text-component-large text-blue-1 transition-all">
            See more
            {<ChevronRightIcon className="h-5 w-5" />}
          </div>
        </div>
      </div>
      {/* CTA Box*/}
      <div className="relative flex w-[608px] flex-col items-center pt-28">
        {/* Offset Blackbox */}
        <div className="absolute -right-3 -bottom-3 z-0 flex h-[75%] w-[100%] items-stretch rounded-2xl bg-[#363D3F]" />
        <div className="relative z-10 flex rounded-[10px] bg-light-orange ring-4 ring-[#FFBC03]">
          {/* Content */}
          <div className="flex flex-col items-center  pt-16 text-center">
            {/* Title */}
            <div className="text-displaytext-center text-h3-desktop text-black-text">
              <p>Hire candidates that are aligned</p> <p>with your mission.</p>
            </div>
            <div className="px-28 pt-6 text-center font-sans text-p2-desktop leading-7  text-black-text ">
              Candidates on [Name TBD] are carefully vetted and screened before
              you decide to interview
            </div>
            {/* Button */}
            <div className="pt-6 pb-20">
              <Button
                label="Apply as an organization"
                className="py-5 pl-[68px] pr-[71px]"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationSection;
