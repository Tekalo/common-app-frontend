import Image from 'next/image';

export interface ITestimonial {
  className?: string;
}

const Testimonial: React.FC<ITestimonial> = ({ className }) => {
  return (
    <div className={`relative flex flex-row justify-center ${className}`}>
      {/* Photo */}
      <Image
        src="/images/PhotoPlaceholder.png"
        alt="Reboot RX Logo"
        className="h-[337px] w-[354px] object-cover"
        width={354}
        height={337}
      />
      <span className="absolute left-[26%] top-1/2">PHOTO</span>
      {/* Text */}
      <div className="flex flex-col items-start justify-center pl-32 align-middle">
        <div className="w-[500px] font-sans text-p1-desktop font-normal text-black-text">
          “I was inspired to join a non-profit that was committed to providing
          assistance and aid, and improving local communities.”
        </div>
        <div className="flex flex-row justify-start pt-4 align-middle ">
          <svg height="32" width="36">
            <line
              x1="0"
              x2="22.39"
              y1="12.5"
              y2="12.5"
              className="stroke-[#363D3F] stroke-1"
            />
          </svg>
          <div className="font-sans text-p2-desktop italic text-black-text">
            Name / Software engineer at [Org name]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
