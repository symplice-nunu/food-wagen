import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "wgl-dsites.net" },
      { protocol: "https", hostname: "d1csarkz8obe9u.cloudfront.net" },
      { protocol: "https", hostname: "www.pexels.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "d1nceuy7c9momq.cloudfront.net" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "cdn.fakercloud.com" },
      { protocol: "https", hostname: "share.google" }
    ],
  },
};

export default nextConfig;
