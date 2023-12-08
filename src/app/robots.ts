import { type MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
	const deployUrl =
		process.env.DEPLOY_URL?.replace(/\/+$/, '') ?? 'http://localhost';
	return {
		rules: {
			userAgent: '*',
			disallow: '/api/'
		},
		sitemap: `${deployUrl}/sitemap.xml`
	};
};

export default robots;
