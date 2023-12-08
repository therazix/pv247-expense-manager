import type { Metadata } from 'next';

import CategoryProviders from './categoryProviders';

export const metadata: Metadata = {
	title: 'Categories'
};

const CategoryLayout = ({ children }: { children: React.ReactNode }) => (
	<CategoryProviders>
		<div className="h-screen grow ">{children}</div>
	</CategoryProviders>
);

export default CategoryLayout;
