'use client';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { useFinancialAccountSelect } from '@/app/_pages/dashboardWrapper';
import { type FinancialAccount } from '@/types/financial-account';

type AccountInput = {
	name: string;
};

const useGetAccounts = (id: string) =>
	useQuery({
		queryKey: ['get', 'financialAccount', id],
		queryFn: async () => {
			const response = await fetch(`api/financialAccount/all/${id}`);
			return (await response.json()) as FinancialAccount[];
		}
	});

const AccountSelectorForm = () => {
	// TODO (Vojta) - Uncomment this when the financials are ready
	/*
    const status = await getServerAuthSession();
	*/
	const { register, handleSubmit } = useForm<AccountInput>();
	const [financialAccount, setFinancialAccount] = useFinancialAccountSelect();
	const result = useGetAccounts('04bc0c8d-1bc0-4344-90e8-1721ff363028');

	if (result.isLoading) return <div>Loading...</div>;
	if (result.isError) return <div>{result.error.message}</div>;
	if (result.data === undefined) return <div>---</div>;

	return (
		<div className="mr-5 flex h-max flex-row items-center">
			<h3 className="text-white text-xl font-bold">Account:</h3>

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
					defaultValue={financialAccount.id}
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
