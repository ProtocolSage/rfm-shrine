const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure MDX
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
};

module.exports = withMDX(nextConfig);
