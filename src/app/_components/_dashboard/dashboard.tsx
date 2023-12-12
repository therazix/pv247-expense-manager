import CategoriesRadialChartWrapper from '../_chart-wrappers/categoriesRadialChartWrapper';
import ExpensesBarWrapper from '../_chart-wrappers/expensesBarWrapper';
import SpendingHeatMapWrapper from '../_chart-wrappers/spendingHeatMapWrapper';

import AccountSelectorForm from './accountSelectForm';
import Header from './header';
import StatusWidget from './statusWidget';

const Dashboard = () => (
	<div className="h-[90vh] w-full overflow-y-scroll bg-dark-gunmetal lg:h-full ">
		<div className="flex flex-row items-end justify-between">
			<h1 className="ml-5 mt-5 h-max text-4xl font-bold text-white">
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

		<div className="h-auto lg:h-1/2">
			<div className="flex h-full w-full flex-row flex-wrap gap-10 pb-1 pl-10 pr-10 lg:flex-nowrap">
				<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-3/5">
					<h1 className="pl-5 pt-2 text-2xl font-bold text-white">
						Expenses and incomes
					</h1>
					<div className="h-5/6">
						<ExpensesBarWrapper />
					</div>
				</div>
				<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-2/5">
					<h1 className="pl-5 pt-2 text-2xl font-bold text-white">
						Expenses by category
					</h1>
					<div className="h-5/6 w-full">
						<CategoriesRadialChartWrapper />
					</div>
				</div>
			</div>
		</div>

		<div className="mb-30 ml-10 mr-10 mt-10 h-auto min-h-fit rounded-3xl bg-[#1D1D41] p-3 pl-10 pr-10 lg:mb-0">
			<h1 className="text-2xl font-bold text-white">Number of transactions</h1>
			<div className="h-96">
				<SpendingHeatMapWrapper />
			</div>
		</div>
	</div>
);

export default Dashboard;
