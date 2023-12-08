import { type MetadataRoute } from 'next';

import { getAppUrl } from '@/utils';

const sitemap = (): MetadataRoute.Sitemap => {
	const appUrl = getAppUrl();
	return [
		{
			url: `${appUrl}/sign-in`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		}
	];
};

export default sitemap;
