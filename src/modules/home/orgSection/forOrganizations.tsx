import { ChevronRightIcon } from '@heroicons/react/24/solid';

export interface IForOrganizations {}

const ForOrganizations: React.FC<IForOrganizations> = () => {
  return (
    <section className="grid w-full place-items-center pt-24">
      <div className="min-w-full px-40">
        {/* Title */}
        <div className="text-center text-desktop-sm-caption uppercase text-gray-1-darkest">
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
          <div className="flex flex-row items-center justify-center pt-14">
            <div className="flex cursor-pointer text-center align-middle text-component-lg text-blue-1-primary transition-all">
              See More
              {<ChevronRightIcon className="h-6" />}
            </div>
          </div>
        </div>
      </div>
      {/* CTA Modal*/}
      {/* Title */}
      {/* Content */}
      {/* Button */}
    </section>
  );
};

export default ForOrganizations;
