'use client';

import { useFinancialAccountSelect } from '@/app/_pages/dashboardWrapper';
import LoadingComponent from '@/app/_charts/loading-component';

import { useGetUniqueFinancialAccount } from './chartQueries';

const Header = () => {
	const [financialAccount, _setFinancialAccount] = useFinancialAccountSelect();
	const result = useGetUniqueFinancialAccount(financialAccount.id);

	if (financialAccount.name === null) {
		return (
			<div className="ml-10">Please select account in right top corner</div>
		);
	}

	if (result.isLoading) {
		return <LoadingComponent />;
	}
	if (result.error) {
		return <div className="mb-5 pl-5">Error: {result.error.message}</div>;
	}

	return (
		<div className="flex flex-row items-center justify-between pl-10 pr-10">
			<div>
				<h1 className="text-2xl font-bold">{financialAccount.name}</h1>
				<div className="pl-10 pr-10">{result.data?.description}</div>
			</div>
			<h1 className="text-3xl font-bold">
				{result.data?.balance} {result.data?.currency}
			</h1>
		</div>
	);
};

export default Header;
