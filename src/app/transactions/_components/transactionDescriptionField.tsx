'use client';

import { useFormContext } from 'react-hook-form';

import { type NewTransaction } from '@/types/transaction';

const TransactionDescriptionField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	return (
		<div className="mb-3 px-6">
			<label htmlFor="description">Description</label>
			<textarea
				{...register('description')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			/>
			{formState.errors.description?.message && (
				<p className="text-lust">{formState.errors.description?.message}</p>
			)}
		</div>
	);
};

export default TransactionDescriptionField;
