'use client';

import CashFlowBox from '../cashflowBox';
import Spinner from '../spinner';

import {
	useGetTransaction,
	useGetUniqueFinancialAccount
} from './chartQueries';
import { useFinancialAccountSelect } from './dashboardProvider';

const StatusWidget = () => {
	const [financialAccount, _setFinancialAccount] = useFinancialAccountSelect();
	const result = useGetTransaction(financialAccount.id);
	const account = useGetUniqueFinancialAccount(financialAccount.id);

	if (financialAccount.name === null) {
		return <div className="ml-10 mt-10"> </div>;
	}

	if (result.isLoading || account.isLoading) return <Spinner />;
	if (result.isError || account.isError) return;

	let totalIncome = 0;
	let totalExpenses = 0;

	result.data?.forEach(transaction => {
		if (transaction.amount < 0) {
			totalExpenses += transaction.amount * -1;
		} else {
			totalIncome += transaction.amount;
		}
	});

	// Date minus 1 month
	const date = new Date();
	date.setMonth(date.getMonth() - 1);

	const transactionsLastMonth = result.data?.filter(
		transaction => new Date(transaction.date) > date
	);

	let totalIncomeLastMonth = 0;
	let totalExpensesLastMonth = 0;

	transactionsLastMonth?.forEach(transaction => {
		if (transaction.amount < 0) {
			totalExpensesLastMonth += transaction.amount * -1;
		} else {
			totalIncomeLastMonth += transaction.amount;
		}
	});

	totalExpensesLastMonth = Math.round(totalExpensesLastMonth * 100) / 100;
	totalIncomeLastMonth = Math.round(totalIncomeLastMonth * 100) / 100;
	totalExpenses = Math.round(totalExpenses * 100) / 100;
	totalIncome = Math.round(totalIncome * 100) / 100;

	let incomePercentChange = Math.round(
		(totalIncomeLastMonth / totalIncome) * 100
	);
	let expensesPercentChange = Math.round(
		(totalExpensesLastMonth / totalExpenses) * 100
	);

	if (
		totalIncome === totalIncomeLastMonth &&
		totalExpenses === totalExpensesLastMonth
	) {
		incomePercentChange = 0;
		expensesPercentChange = 0;
	}

	return (
		<div className="mb-3 ml-6 mr-5 mt-3 flex flex-row flex-wrap items-stretch justify-start gap-0 md:mb-0 md:ml-5 md:mt-0 md:flex-nowrap md:gap-5">
			<CashFlowBox
				title="Total income"
				money={totalIncome}
				currency={account.data?.currency ?? ''}
				percentChange={incomePercentChange}
				iconBgColorVariant="maya-blue"
				icon="FaArrowTrendUp"
				isNegative={false}
			/>
			<CashFlowBox
				title="Total expenses"
				money={totalExpenses}
				currency={account.data?.currency ?? ''}
				percentChange={expensesPercentChange}
				iconBgColorVariant="marigold"
				icon="FaArrowTrendDown"
				isNegative
			/>
		</div>
	);
};

export default StatusWidget;
