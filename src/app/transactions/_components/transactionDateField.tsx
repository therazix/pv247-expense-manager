'use client';

import { useFormContext } from 'react-hook-form';

import { type NewTransaction } from '@/types/transaction';

const TransactionDateField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	return (
		<div className="w-full">
			<label htmlFor="datetime">DateTime</label>
			<input
				type="date"
				{...register('datetime')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			/>
			{formState.errors.datetime?.message && (
				<p className="text-lust">{formState.errors.datetime?.message}</p>
			)}
		</div>
	);
};

export default TransactionDateField;
