import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';
import { getCategoriesByUserId } from '@/server/repositories/category';

import ContentBox from '../_components/contentBox';

import { CategoryForm } from './_components/categoryForm';
import CategoryBox from './_components/categoryBox';

const CategoryListPage = async () => {
	const session = await getServerAuthSession();
	if (!session) {
		redirect('/sign-in?callbackUrl=/categories');
	}

	const categories = await getCategoriesByUserId(session.user.id);

	if (categories.length === 0) {
		return (
			<>
				<h1 className="mx-6 pt-6 text-3xl font-bold">Categories</h1>
				<ContentBox>
					<div className="flex items-center justify-center">
						<p>You have no category yet</p>
					</div>
					<CategoryForm />
				</ContentBox>
			</>
		);
	}

	return (
		<div>
			<h1 className="mx-6 pt-6 text-3xl font-bold">Categories</h1>
			<div className="flex flex-wrap">
				{categories.map(category => (
					<div key={category.id} className="w-full md:w-1/2 xl:w-1/3">
						<CategoryBox category={category} />
					</div>
				))}
				<CategoryForm />
			</div>{' '}
		</div>
	);
};
export default CategoryListPage;
