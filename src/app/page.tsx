import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';

import CategoriesRadialChart from './charts/categories-radial';
import ExpensesBar from './charts/expenses-bar';

const Home = async () => {
	const session = await getServerAuthSession();
	if (!session) {
		redirect('/sign-in?callbackUrl=/');
	}

	return (
		<div className="h-full w-full">
			<h1 className="ml-5 mt-5 text-4xl font-bold text-white">Dashboard</h1>
			<div className="mt-10 flex h-1/2 w-full flex-row flex-wrap gap-10 pl-10 pr-10 lg:flex-nowrap">
				<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-3/5">
					<h1 className="pl-5 pt-2 text-2xl font-bold text-white">
						Expenses and incomes
					</h1>
					<div className="h-5/6">
						<ExpensesBar
							params={{
								timeLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
								data: [
									{
										name: 'Expenses',
										data: [30, 40, 45, 50, 49, 60, 70],
										color: '#C21858'
									},
									{
										name: 'Income',
										data: [10, 20, 35, 40, 39, 50, 60],
										color: '#57ACDC'
									}
								]
							}}
						/>
					</div>
				</div>
				<div className="h-96 w-full rounded-3xl bg-[#1D1D41] p-3 lg:h-full lg:w-2/5">
					<h1 className="pl-5 pt-2 text-2xl font-bold text-white">
						Categories
					</h1>
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
};

export default Home;
