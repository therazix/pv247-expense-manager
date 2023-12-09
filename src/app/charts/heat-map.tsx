'use client';

import dynamic from 'next/dynamic';

import LoadingComponent from './loading-component';
import { DefaultColors } from './default-colors';

const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <LoadingComponent />
});

export type HeatMapChartProps = {
	month: string;
	data: {
		day: string;
		value: number;
	}[];
}[];

const HeatMapChart = ({ params }: { params: HeatMapChartProps }) => (
	<Chart
		type="heatmap"
		options={{
			chart: {
				id: 'heatmap',
				toolbar: {
					show: false
				}
			},
			legend: {
				show: false
			},
			tooltip: {
				theme: 'dark'
			},
			xaxis: {
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
			colors: [DefaultColors[3]],
			plotOptions: {
				heatmap: {
					radius: 2,
					enableShades: true,
					colorScale: {
						ranges: [
							{
								from: 0,
								color: DefaultColors[3],
								foreColor: DefaultColors[3]
							}
						]
					}
				}
			},
			stroke: {
				show: true,
				width: 3,
				colors: ['#141332']
			}
		}}
		height="100%"
		width="100%"
		series={params.map(param => ({
			name: param.month,
			data: param.data.map(dayAndValue => ({
				x: dayAndValue.day,
				y: dayAndValue.value
			}))
		}))}
	/>
);

export default HeatMapChart;
