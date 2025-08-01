/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',  
          port: '',
          pathname: '/a/**',
        }, 
        {
          protocol: 'https',
          hostname: 'jqytzckxfdyhtacmncvj.supabase.co', 
          port: '',
          pathname: '/storage/v1/object/public/avatars/**',
        },
      ],
    },
  };
  
  export default nextConfig;