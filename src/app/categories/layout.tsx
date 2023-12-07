import CategoryProviders from './categoryProviders';

const CategoryLayout = ({ children }: { children: React.ReactNode }) => (
	<CategoryProviders>
		<div className="h-screen grow ">{children}</div>
	</CategoryProviders>
);

export default CategoryLayout;
