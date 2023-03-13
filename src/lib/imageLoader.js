const normalizeSrc = (src) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export const cloudflareLoader = ({ src, width, quality }) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `https://capp-resizer.smartin.workers.dev/${paramsString}/${normalizeSrc(
    src
  )}`;
};
