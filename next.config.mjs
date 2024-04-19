// @type {import('next').NextConfig}
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "8000",
//         pathname: "/media/product_images",
//       },
//       {
//         protocol: "https", // Assuming your AP>
//         hostname: "api.bekasstore.pro",
//         pathname: "/media/product_images",
//       },
//     ],
//   },
// };

// export default nextConfig;

export default {
  images: {
    domains: ["localhost", "api.bekasstore.pro"],
  },
};
