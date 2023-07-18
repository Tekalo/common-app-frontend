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

  return `https://tekalo.org/cdn-cgi/image/${paramsString}/${normalizeSrc(
    src
  )}`;
};

export default cloudflareLoader;
