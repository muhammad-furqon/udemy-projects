/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: 'next-image-furqon.s3.ap-northeast-1.amazonaws.com'}]
    }
};

export default nextConfig;
