'use client';

import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { type NewTransaction } from '@/types/transaction';
import { financialAccountSchema } from '@/validators/financial-account';

const TransactionAccountField = () => {
	const { register, formState } = useFormContext<NewTransaction>();

	const useFinancialAccounts = () =>
		useQuery({
			queryKey: ['financialAccounts'],
			queryFn: async () => {
				const response = await fetch('/api/financialAccount').then(res =>
					res.json()
				);

				return financialAccountSchema.array().parse(response);
			}
		});

	const { data: financialAccounts, error } = useFinancialAccounts();

	return (
		<div className="w-full">
			<label htmlFor="financialAccountId">Account</label>
			<select
				placeholder="Select an account"
				{...register('financialAccountId')}
				className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
			>
				{financialAccounts?.map(financialAccount => (
					<option key={financialAccount.id} value={financialAccount.id}>
						{financialAccount.name}
					</option>
				))}
			</select>
			{formState.errors.financialAccountId?.message && (
				<p className="text-lust">
					{formState.errors.financialAccountId?.message}
				</p>
			)}
			{error && <p className="text-lust">{error.message}</p>}
		</div>
	);
};

export default TransactionAccountField;
