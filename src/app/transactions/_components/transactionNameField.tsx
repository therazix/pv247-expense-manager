'use client';

import { useFormContext } from 'react-hook-form';

import { type NewTransaction } from '@/types/transaction';

const TransactionNameField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	return (
		<div className="w-full">
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

export default TransactionNameField;
