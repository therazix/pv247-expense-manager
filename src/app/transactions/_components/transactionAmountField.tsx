'use client';

import { useFormContext } from 'react-hook-form';

import { type NewTransaction } from '@/types/transaction';

const TransactionAmountField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	return (
		<div className="w-full">
			<label htmlFor="amount">Amount</label>
			<input
				type="number"
				{...register('amount')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			/>
			{formState.errors.amount?.message && (
				<p className="text-lust">{formState.errors.amount?.message}</p>
			)}
		</div>
	);
};

export default TransactionAmountField;
