'use client';

import { time } from 'console';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <p>Loading...</p>
});

export type ExpensesLineProps = {
	timeLabels: string[];
	data: {
		name: string;
		data: number[];
		color?: string;
	}[];
};

const ExpensesLine = ({ params }: { params: ExpensesLineProps }) => (
	<Chart
		type="line"
		options={{
			chart: {
				id: 'expenses-line'
			},
			xaxis: {
				categories: params.timeLabels
			},
			colors: [...params.data.map((data, index) => data.color ?? )]
		}}
		series={[
			...params.data.map(data => ({
				name: data.name,
				data: data.data
			}))
		]}
		height={200}
		width={500}
	/>
);

export default ExpensesLine;
