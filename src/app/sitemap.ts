import { type MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
	const deployUrl =
		process.env.DEPLOY_URL?.replace(/\/+$/, '') ?? 'http://localhost';
	return [
		{
			url: `${deployUrl}/sign-in`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		}
	];
};

export default sitemap;
