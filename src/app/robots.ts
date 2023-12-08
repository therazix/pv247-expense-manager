import { type MetadataRoute } from 'next';

import { getAppUrl } from '@/utils';

const robots = (): MetadataRoute.Robots => {
	const appUrl = getAppUrl();
	return {
		rules: {
			userAgent: '*',
			disallow: '/api/'
		},
		sitemap: `${appUrl}/sitemap.xml`
	};
};

export default robots;
