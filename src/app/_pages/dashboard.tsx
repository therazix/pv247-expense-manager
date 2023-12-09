import { Suspense } from 'react';

import AccountSelectorForm from '../_components/_dashboard/accountSelectForm';
import CategoriesRadialChartWrapper from '../_components/_dashboard/categoriesRadialChartWrapper';
import ExpensesBarWrapper from '../_components/_dashboard/expensesBarWrapper';
import Header from '../_components/_dashboard/header';
import StatusWidget from '../_components/_dashboard/statusWidget';
import SpendingHeatMapWrapper from '../_components/_dashboard/spendingHeatMapWrapper';

const Dashboard = () => (
	<div className="h-full w-full overflow-y-scroll bg-dark-gunmetal">
		<div className="flex flex-row items-end justify-between">
			<h1 className="text-white ml-5 mt-5 h-max text-4xl font-bold">
				Dashboard
			</h1>
			<AccountSelectorForm />
		</div>

		<div className="mt-10 w-full pl-10 pr-10">
			<div className="w-full rounded-3xl bg-[#1D1D41] pb-5 pt-5">
				<Header />
			</div>
		</div>

		<StatusWidget />

		<div className="flex h-auto w-full flex-row flex-wrap gap-10 pl-10 pr-10 md:h-1/2 lg:flex-nowrap">
			<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-3/5">
				<h1 className="text-white pl-5 pt-2 text-2xl font-bold">
					Expenses and incomes
				</h1>
				<div className="h-5/6">
					<ExpensesBarWrapper />
				</div>
			</div>
			<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-2/5">
				<h1 className="text-white pl-5 pt-2 text-2xl font-bold">
					Expenses by category
				</h1>
				<div className="h-5/6 w-full">
					<CategoriesRadialChartWrapper />
				</div>
			</div>
		</div>

		<div className="ml-10 mr-10 mt-10 rounded-3xl bg-[#1D1D41] p-3 pl-10 pr-10">
			<h1 className="text-white text-2xl font-bold">Number of transactions</h1>
			<div className="h-96">
				<SpendingHeatMapWrapper />
			</div>
		</div>
	</div>
);

export default Dashboard;
