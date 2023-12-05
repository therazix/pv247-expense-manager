import { getServerAuthSession } from '@/server/auth';
import { getCategoriesByUserId } from '@/server/repositories/category';

import ContentBox from '../_components/contentBox';
import Spinner from '../_components/spinner';

import { CategoryForm } from './_components/categoryForm';
import CategoryProviders from './categoryProviders';
import CategoryBox from './_components/categoryBox';

const CategoryListPage = async () => {
	const session = await getServerAuthSession();
	if (!session) {
		return <Spinner />;
	}

	const categories = await getCategoriesByUserId(session.user.id);

	if (categories.length === 0) {
		return (
			<CategoryProviders>
				<h1 className="mx-6 mt-6 text-3xl font-bold">Categories</h1>
				<ContentBox>
					<div className="flex items-center justify-center">
						<p>You have no category yet</p>
					</div>
					<CategoryForm />
				</ContentBox>
			</CategoryProviders>
		);
	}

	return (
		<CategoryProviders>
			<div>
				<h1 className="mx-6 mt-6 text-3xl font-bold">Categories</h1>
				<div className="flex flex-wrap">
					{categories.map(category => (
						<div key={category.id} className="w-full md:w-1/2 xl:w-1/3">
							<CategoryBox category={category} />
						</div>
					))}
					<CategoryForm />
				</div>{' '}
			</div>
		</CategoryProviders>
	);
};
export default CategoryListPage;
