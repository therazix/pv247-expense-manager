'use client';

import dynamic from 'next/dynamic';

import LoadingComponent from './loading-component';
const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <LoadingComponent />
});

const IncomeOutcomeBar = () => (
	<Chart type="bar" options={{}} height="100%" width="100%" />
);

export default IncomeOutcomeBar;
