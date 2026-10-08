const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://localhost:5000/api/:path*",
			},
		];
	},
	
	webpack: (config, { isServer }) => {
		// Handle browser-only packages
		if (isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				"formdata-node": false,
				btoa: false,
				qs: false,
				traverse: false,
				cookie: false,
			};
		}
		
		return config;
	},
};

export default nextConfig;
