/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3-wildoasis.s3.ap-south-1.amazonaws.com',
				port: '',
				pathname: '/**',
			},
		],
	},
	// output: "export",
};

export default nextConfig;
