'use client';

import dynamic from 'next/dynamic';

import { DefaultColors } from './default-colors';
import LoadingComponent from './loading-component';

const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <LoadingComponent />
});

export type CategoriesRadialChartProps = {
	labels: string[];
	data: number[];
	colors?: string[];
};

const CategoriesRadialChart = ({
	params
}: {
	params: CategoriesRadialChartProps;
}) => (
	<Chart
		type="radialBar"
		options={{
			chart: {
				id: 'categories-radial',
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
				fontSize: '16px',
				labels: {
					colors: '#b3b3b3'
				}
			},
			plotOptions: {
				radialBar: {
					hollow: {
						size: '35%'
					},
					track: {
						background: '#272754',
						endAngle: 360
					},
					dataLabels: {
						value: {
							color: '#b3b3b3'
						}
					}
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

export default CategoriesRadialChart;
