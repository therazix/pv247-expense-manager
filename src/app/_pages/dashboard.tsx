import AccountSelectorForm from '../_components/_dashboard/accountSelectForm';
import ExpensesBarWrapper from '../_components/_dashboard/expensesBarWrapper';
import CategoriesRadialChart from '../charts/categories-radial';
import ExpensesBar from '../charts/expenses-bar';

const Dashboard = () => (
	<div className="h-full w-full bg-dark-gunmetal">
		<div className="flex flex-row items-end justify-between">
			<h1 className="text-white ml-5 mt-5 h-max text-4xl font-bold">
				Dashboard
			</h1>
			<AccountSelectorForm />
		</div>
		<div className="mt-10 flex h-1/2 w-full flex-row flex-wrap gap-10 pl-10 pr-10 lg:flex-nowrap">
			<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-3/5">
				<h1 className="text-white pl-5 pt-2 text-2xl font-bold">
					Expenses and incomes
				</h1>
				<div className="h-5/6">
					<ExpensesBarWrapper />
				</div>
			</div>
			<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-2/5">
				<h1 className="text-white pl-5 pt-2 text-2xl font-bold">Categories</h1>
				<div className="h-5/6 w-full">
					<CategoriesRadialChart
						params={{
							labels: ['Food', 'Transport', 'Bills', 'Entertainment'],
							data: [30, 80, 45, 50],
							colors: ['#C21858', '#57ACDC', '#57DCBE', '#60C689']
						}}
					/>
				</div>
			</div>
		</div>
	</div>
);

export default Dashboard;
