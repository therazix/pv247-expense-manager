'use client';

import dynamic from 'next/dynamic';

import Spinner from '../_components/spinner';
const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <Spinner />
});

const IncomeOutcomeBar = () => (
	<Chart type="bar" options={{}} height="100%" width="100%" />
);

export default IncomeOutcomeBar;
