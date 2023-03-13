interface ILoader {
  src: string;
  width?: number;
  quality?: number;
}

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export const cloudflareLoader = ({ src, width, quality }: ILoader) => {
  const params = [`width=${width}`];

  if (quality) {
    params.push(`quality=${quality}`);
  }

  const paramsString = params.join(',');
  return `https://capp-resizer.smartin.workers.dev/${paramsString}/${normalizeSrc(
    src
  )}`;
};
