'use client';

import dynamic from 'next/dynamic';

import { DefaultColors } from './default-colors';
import LoadingComponent from './loading-component';
const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <LoadingComponent />
});

export type ExpensesBarProps = {
	timeLabels: string[];
	data: {
		name: string;
		data: number[];
		color?: string;
	}[];
};

const ExpensesBar = ({ params }: { params: ExpensesBarProps }) => (
	<Chart
		type="bar"
		options={{
			dataLabels: {
				enabled: false
			},
			chart: {
				id: 'expenses-line',
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
					borderRadius: 5
				}
			},
			xaxis: {
				categories: [...params.timeLabels],
				labels: {
					style: {
						fontSize: '1rem',
						colors: '#b3b3b3'
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						fontSize: '1rem',
						colors: '#b3b3b3'
					}
				}
			},
			tooltip: {
				theme: 'dark'
			},
			grid: {
				borderColor: '#b3b3b3',
				strokeDashArray: 4,
				yaxis: {
					lines: {
						show: true
					}
				},
				xaxis: {
					lines: {
						show: false
					}
				}
			},
			legend: {
				show: true,
				fontSize: '16px',
				fontWeight: 400,
				labels: {
					colors: '#b3b3b3'
				},
				markers: {
					width: 20,
					height: 20,
					radius: 20
				}
			},

			colors: [
				...params.data.map(
					(data, index) =>
						data.color ?? DefaultColors[index % DefaultColors.length]
				)
			]
		}}
		series={[
			...params.data.map(data => ({
				name: data.name,
				data: data.data
			}))
		]}
		height="100%"
		width="100%"
	/>
);

export default ExpensesBar;
