'use client';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { type FinancialAccount } from '@/types/financial-account';

import Spinner from '../spinner';

import { useFinancialAccountSelect } from './dashboardProvider';

type AccountInput = {
	name: string;
};

const useGetAccounts = () =>
	useQuery({
		queryKey: ['get', 'financialAccounts'],
		queryFn: async () => {
			const response = await fetch(`/api/financialAccount`);
			return (await response.json()) as FinancialAccount[];
		}
	});

const AccountSelectorForm = () => {
	const { register } = useForm<AccountInput>();
	const [_financialAccount, setFinancialAccount] = useFinancialAccountSelect();

	const result = useGetAccounts();

	if (result.isLoading) return <Spinner />;
	if (result.isError)
		return <div className="pl-5 pr-5">Error: {result.error.message}</div>;
	if (result.data === undefined) return <div>Corrupted data</div>;

	return (
		<div className="mr-10 flex h-max w-fit flex-row items-center">
			<h3 className="mr-5 text-xl font-bold text-white">Account:</h3>

			<form>
				<select
					{...register('name')}
					className="m-1 bg-[#1D1D41] p-2 hover:cursor-pointer"
					onChange={e =>
						setFinancialAccount({
							id: e.target.value,
							name: e.target.selectedOptions[0].text
						})
					}
					defaultValue="Default"
				>
					<option value="Default" className="bg-[#1D1D41]" key="Default">
						Default
					</option>
					{result.data.map(param => (
						<option key={param.id} value={param.id} className="bg-[#1D1D41]">
							{param.name}
						</option>
					))}
				</select>
			</form>
		</div>
	);
};

export default AccountSelectorForm;
