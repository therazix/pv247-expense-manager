'use client';

import { useFinancialAccountSelect } from '@/app/_pages/dashboardWrapper';
import CategoriesRadialChart from '@/app/_charts/categories-radial';
import { selectableColors } from '@/constants/selectables';
import LoadingComponent from '@/app/_charts/loading-component';

import { useGetTransaction } from './chartQueries';
import NoDataComponent from './noDataComponent';

const CategoriesRadialChartWrapper = () => {
	const [financialAccount, _setFinancialAccount] = useFinancialAccountSelect();
	const result = useGetTransaction(financialAccount.id);

	if (result.isLoading) return <LoadingComponent />;
	if (result.isError)
		return <div className="pl-5">Error: {result.error.message}</div>;
	if (result.data === undefined) return <div>---</div>;

	const categories = result.data.map(param => param.category);
	const uniqueNamesSet = new Set();

	if (categories.length === 0) {
		return <NoDataComponent />;
	}

	// Filter out duplicates and create an array of unique names
	const uniqueCategories = categories.filter(obj => {
		if (!uniqueNamesSet.has(obj.name)) {
			uniqueNamesSet.add(obj.name);
			return true;
		}
		return false;
	});

	// Create a dictionary of categories and their total amounts of spending
	const categoryAmounts: { [key: string]: number } = {};
	uniqueCategories.forEach(category => {
		categoryAmounts[category.name] = 0;
	});

	// count the total amount of each category
	result.data.forEach(transaction => {
		const category = transaction.category;
		if (transaction.amount > 0) return; // If the transaction is income, skip it
		categoryAmounts[category.name] -= transaction.amount; // Add the amount of spends to the category
	});

	// Get highest category amount
	const maxAmount = Math.max(...Object.values(categoryAmounts));

	// Normalize the amounts to be between 0 and 100 where 100 is the highest amount
	Object.keys(categoryAmounts).forEach(key => {
		categoryAmounts[key] = Math.round((categoryAmounts[key] / maxAmount) * 100);
	});

	const categoryAmountsKeys = Object.keys(categoryAmounts);
	const colors = uniqueCategories.map(category => category.color);
	const sortedColors = colors.sort(
		(a, b) => categoryAmountsKeys.indexOf(a) - categoryAmountsKeys.indexOf(b)
	);

	// Iterate over selectables and add the hex values to the colors
	Object.entries(selectableColors).forEach(([key, value]) => {
		sortedColors.forEach((color, index) => {
			if (color === key) {
				sortedColors[index] = value;
			}
		});
	});
	// Map sorted colort to their hex values

	return (
		<CategoriesRadialChart
			params={{
				labels: Object.keys(categoryAmounts),
				data: Object.values(categoryAmounts),
				colors: sortedColors
			}}
		/>
	);
};

export default CategoriesRadialChartWrapper;
