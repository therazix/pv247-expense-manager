'use client';

import dynamic from 'next/dynamic';

import { DefaultColors } from './default-colors';
const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
	loading: () => <p>Loading...</p>
});

const IncomeOutcomeBar = () => (
	<Chart type="bar" options={{}} height="100%" width="100%" />
);

export default IncomeOutcomeBar;
