'use client';

import { useFormContext } from 'react-hook-form';

import { type NewTransaction } from '@/types/transaction';

const TransactionDateField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	return (
		<div className="w-full">
			<label htmlFor="dateString">Date</label>
			<input
				type="date"
				{...register('dateString')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			/>
			{formState.errors.dateString?.message && (
				<p className="text-lust">{formState.errors.dateString?.message}</p>
			)}
		</div>
	);
};

export default TransactionDateField;
