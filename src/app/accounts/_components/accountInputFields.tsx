'use client';

import { useFormContext } from 'react-hook-form';

import { type NewFinancialAccount } from '@/types/financial-account';

export const AccountInputFields = () => {
	const { register, formState } = useFormContext<NewFinancialAccount>();

	return (
		<>
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
			<div className="mb-3 px-6">
				<label htmlFor="description">Description</label>
				<input
					{...register('description')}
					className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
				/>
				{formState.errors.description?.message && (
					<p className="text-lust">{formState.errors.description?.message}</p>
				)}
			</div>
			<div className="mb-3 px-6">
				<label htmlFor="currency">Currency</label>
				<input
					{...register('currency')}
					className="mt-2 w-full rounded-xl border-2 border-majorelle-blue/[0.5] bg-yankees-blue p-3 outline-none"
				/>
				{formState.errors.currency?.message && (
					<p className="text-lust">{formState.errors.currency?.message}</p>
				)}
			</div>
		</>
	);
};
