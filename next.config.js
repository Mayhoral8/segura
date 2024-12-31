/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
  images: {
    domains: ['res.cloudinary.com'], // Add the allowed image hostnames here
  },
};