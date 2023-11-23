'use client';

import dynamic from 'next/dynamic';

import { DefaultColors } from './default-colors';

const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <p>Loading...</p>
});

export type CategoriesPieChartProps = {
	labels: string[];
	data: number[];
	colors?: string[];
};

const CategoriesPieChart = ({
	params
}: {
	params: CategoriesPieChartProps;
}) => (
	<Chart
		type="pie"
		options={{
			chart: {
				id: 'categories-pie',
				toolbar: {
					show: false
				}
			},
			tooltip: {
				theme: 'dark'
			},
			colors: params.colors ?? DefaultColors,
			labels: params.labels,
			legend: {
				show: true,
				position: 'bottom',
				labels: {
					colors: '#b3b3b3'
				},
				fontSize: '16px'
			},
			plotOptions: {
				pie: {
					expandOnClick: false
				}
			},
			stroke: {
				show: false
			}
		}}
		series={params.data}
		width="100%"
		height="100%"
	/>
);

export default CategoriesPieChart;
