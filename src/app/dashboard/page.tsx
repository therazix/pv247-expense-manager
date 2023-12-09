import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getServerAuthSession } from '@/server/auth';

import Dashboard from '../_pages/dashboard';
import DashboardWrapper from '../_pages/dashboardWrapper';
import Spinner from '../_components/spinner';

const DashboardPage = async () => {
	const session = await getServerAuthSession();
	if (!session) {
		redirect('/sign-in');
	}

	const id = session.user.id;
	return (
		<DashboardWrapper>
			<Suspense fallback={<Spinner />}>
				<Dashboard userId={id} />
			</Suspense>
		</DashboardWrapper>
	);
};

export default DashboardPage;
