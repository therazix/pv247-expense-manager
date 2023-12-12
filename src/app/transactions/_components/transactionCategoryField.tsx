'use client';

import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { type NewTransaction } from '@/types/transaction';
import { categorySchema } from '@/validators/category';

const TransactionCategoryField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	const useCategories = () =>
		useQuery({
			queryKey: ['categories'],
			queryFn: async () => {
				const response = await fetch('/api/category').then(res => res.json());

				// TODO: error handling
				const categories = categorySchema.array().parse(response);
				return categories;
			}
		});

	const { data: categories } = useCategories();

	return (
		<div className="w-full">
			<label htmlFor="categoryId">Category</label>
			<select
				{...register('categoryId')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			>
				<option value="">No category</option>
				{categories?.map(category => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
			{formState.errors.categoryId?.message && (
				<p className="text-lust">{formState.errors.categoryId?.message}</p>
			)}
		</div>
	);
};

export default TransactionCategoryField;
