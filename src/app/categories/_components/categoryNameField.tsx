'use client';

import { useFormContext } from 'react-hook-form';

import { type NewCategory } from '@/types/category';

export const CategoryNameField = () => {
	const { register, formState } = useFormContext<NewCategory>();

	return (
		<div className="mb-3 px-6">
			<label htmlFor="name">Name</label>
			<input
				{...register('name')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			/>
			{formState.errors.name?.message && (
				<p className="text-lust">{formState.errors.name?.message}</p>
			)}
		</div>
	);
};
