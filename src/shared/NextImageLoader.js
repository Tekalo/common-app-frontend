// import Image from "next/image";
// import React from "react";

// const normalizeSrc = (src) => {
//   return src.startsWith("/") ? src.slice(1) : src;
// };

// export default function NextImageLoader({ src, width, quality }) {
//   const params = [`width=${width}`];
//   if (quality) {
//     params.push(`quality=${quality}`);
//   }
//   const paramsString = params.join(",");
//   return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
// }
