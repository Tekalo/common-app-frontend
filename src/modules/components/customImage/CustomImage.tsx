/**
 * This component should render images differently depending on the presence and value of a particular environment variable.
 *
 * In localhost, it should use Next/Image components
 * In cf-preview, it should use a regular image
 * In cf-production, it should use Next/Image but with a custom loader
 */

import cloudflareLoader from '@/lib/imageLoader';
import Image from 'next/image';

export interface ICustomImage {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}

const CustomImage: React.FC<ICustomImage> = ({
  src,
  alt,
  className,
  width,
  height,
}) => {
  switch (process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION_ENV) {
    case 'preview':
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt} className={className} />;

    case 'production':
      return (
        <Image
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
          loader={cloudflareLoader}
        />
      );

    default:
      return (
        <Image
          src={src}
          alt={alt}
          className={className}
          width={width}
          height={height}
        />
      );
  }
};

export default CustomImage;
