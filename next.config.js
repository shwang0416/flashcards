/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    useFormStatus: true,
    useFormState: true,
  },
};

module.exports = nextConfig;
