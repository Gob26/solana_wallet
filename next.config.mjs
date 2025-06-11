/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
      SOL_RPC: 'https://api.devnet.solana.com', //  URL  RPC-эндпоинта
    },
  };
  
  export default nextConfig;