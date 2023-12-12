import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getServerAuthSession } from '@/server/auth';

import Spinner from '../_components/spinner';
import Dashboard from '../_components/_dashboard/dashboard';
import DashboardProvider from '../_components/_dashboard/dashboardProvider';

const DashboardPage = async () => {
	const session = await getServerAuthSession();
	if (!session) {
		redirect('/sign-in?callbackUrl=/dashboard');
	}

	return (
		<DashboardProvider>
			<Suspense fallback={<Spinner />}>
				<Dashboard />
			</Suspense>
		</DashboardProvider>
	);
};

export default DashboardPage;
