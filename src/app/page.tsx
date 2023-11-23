import CategoriesPieChart from './charts/categories-pie';
import ExpensesLine, { ExpensesLineProps } from './charts/expenses-line';

const Home = () => (
	<main className="w-screen bg-[#1D1D41]">
		<div className="flex flex-col justify-center p-60">
			<div className="max-w-screen h-[600px]">
				<ExpensesLine
					params={{
						timeLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
						data: [
							{
								name: 'Expenses',
								data: [30, 40, 45, 50, 49, 60, 70]
							},
							{
								name: 'Income',
								data: [10, 20, 35, 40, 39, 50, 60]
							}
						]
					}}
				/>
			</div>
			<div className="max-w-screen h-[600px]">
				<CategoriesPieChart
					params={{
						labels: ['Food', 'Clothes', 'Transport', 'Other'],
						data: [30, 40, 45, 50]
					}}
				/>
			</div>
		</div>
	</main>
);

export default Home;
