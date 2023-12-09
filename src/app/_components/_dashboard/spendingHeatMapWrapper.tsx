'use client';

import { useFinancialAccountSelect } from '@/app/_pages/dashboardWrapper';
import HeatMapChart, { type HeatMapChartProps } from '@/app/_charts/heat-map';
import LoadingComponent from '@/app/_charts/loading-component';

import { useGetTransaction } from './chartQueries';
import NoDataComponent from './noDataComponent';

const SpendingHeatMapWrapper = () => {
	const [financialAccount, _setFinancialAccount] = useFinancialAccountSelect();
	const result = useGetTransaction(financialAccount.id);

	if (result.isLoading) return <LoadingComponent />;
	if (result.isError)
		return <div className="pl-5">Error: {result.error.message}</div>;
	if (result.data === undefined) return <div>Something went wrong!</div>;

	if (result.data.length === 0) {
		return <NoDataComponent />;
	}

	// Calculate number of transactions per day in last year
	const today = new Date();
	const lastYear = new Date();
	lastYear.setFullYear(today.getFullYear() - 1);
	const lastYearTransactions = result.data.filter(transaction => {
		const transactionDate = new Date(transaction.datetime);
		return transactionDate > lastYear;
	});

	const transactionsPerDayAndMonth: {
		[month: string]: {
			day: string;
			value: number;
		}[];
	} = {};

	lastYearTransactions.forEach(transaction => {
		const transactionDate = new Date(transaction.datetime);
		const month = transactionDate.toLocaleString('default', { month: 'short' });
		const day = transactionDate.getDate().toString();
		if (transactionsPerDayAndMonth[month] === undefined) {
			transactionsPerDayAndMonth[month] = [];
			// For each month, create an array of days and their values
			for (let i = 1; i <= 31; i++) {
				transactionsPerDayAndMonth[month].push({
					day: i.toString(),
					value: 0
				});
			}
		}

		// If the day already exists, increment its value
		// Otherwise, create a new day with value 1
		const dayExists = transactionsPerDayAndMonth[month].some(
			dayAndValue => dayAndValue.day === day
		);
		if (dayExists) {
			transactionsPerDayAndMonth[month].forEach(dayAndValue => {
				if (dayAndValue.day === day) {
					dayAndValue.value++;
				}
			});
			return;
		} else {
			transactionsPerDayAndMonth[month].push({
				day,
				value: 1
			});
		}
	});

	const props: HeatMapChartProps = [];

	Object.keys(transactionsPerDayAndMonth).forEach(month => {
		props.push({
			month,
			data: transactionsPerDayAndMonth[month]
		});
	});

	return <HeatMapChart params={props} />;
};

export default SpendingHeatMapWrapper;
