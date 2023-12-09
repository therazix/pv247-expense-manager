'use client';

import { useFinancialAccountSelect } from '@/app/_pages/dashboardWrapper';
import ExpensesBar from '@/app/_charts/expenses-bar';
import LoadingComponent from '@/app/_charts/loading-component';

import { useGetTransaction } from './chartQueries';
import NoDataComponent from './noDataComponent';

const ExpensesBarWrapper = () => {
	const [financialAccount, _setFinancialAccount] = useFinancialAccountSelect();
	const result = useGetTransaction(financialAccount.id);

	if (result.isLoading) return <LoadingComponent />;
	if (result.isError)
		return <div className="pl-5">Error: {result.error.message}</div>;
	if (result.data === undefined) return <div>---</div>;

	const months = result.data
		.map(param => ({
			date: new Date(param.datetime),
			data: param // Optionally include the entire object for reference
		}))
		.sort((a, b) => {
			// Compare years
			const yearComparison = a.date.getFullYear() - b.date.getFullYear();
			if (yearComparison !== 0) {
				return yearComparison;
			}

			// If years are the same, compare months
			return a.date.getMonth() - b.date.getMonth();
		});

	const uniqueMonths = Array.from(
		new Set(
			months.map(transaction => {
				const date = transaction.date;
				return `${date.toLocaleString('en-us', {
					month: 'short'
				})}-${date.getFullYear()}`;
			})
		)
	);

	const monthlyExpenses: { [key: string]: number } = {};
	const monthlyIncome: { [key: string]: number } = {};

	uniqueMonths.forEach(month => {
		monthlyExpenses[month] = 0;
		monthlyIncome[month] = 0;
	});

	result.data.forEach(transaction => {
		const date = new Date(transaction.datetime);
		const monthYear = `${date.toLocaleString('en-us', {
			month: 'short'
		})}-${date.getFullYear()}`;

		if (transaction.amount < 0) {
			monthlyExpenses[monthYear] += transaction.amount * -1;
		} else {
			monthlyIncome[monthYear] += transaction.amount;
		}
	});

	const monthlyExpensesArray = uniqueMonths.map(
		month => monthlyExpenses[month]
	);
	const monthlyIncomeArray = uniqueMonths.map(month => monthlyIncome[month]);

	if (monthlyExpensesArray.length === 0) {
		return <NoDataComponent />;
	}

	return (
		<ExpensesBar
			params={{
				timeLabels: uniqueMonths,
				data: [
					{
						name: 'Expenses',
						data: monthlyExpensesArray,
						color: '#C21858'
					},
					{
						name: 'Income',
						data: monthlyIncomeArray,
						color: '#57ACDC'
					}
				]
			}}
		/>
	);
};

export default ExpensesBarWrapper;
