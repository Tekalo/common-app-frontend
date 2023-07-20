interface LoaderOptions {
  src: string;
  width: number;
  quality?: number;
}

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

const cloudflareLoader = ({ src, width, quality }: LoaderOptions): string => {
  const params: string[] = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }

  const paramsString = params.join(',');

  if (process.env.NEXT_PUBLIC_IMAGE_OPTIMIZATION_ENV === 'production') {
    return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
  } else {
    return src;
  }
};

export default cloudflareLoader;
