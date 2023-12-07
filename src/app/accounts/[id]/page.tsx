import { redirect } from 'next/navigation';

import { getFinancialAccountById } from '@/server/repositories/financialAccount';
import { getServerAuthSession } from '@/server/auth';
import ContentBox from '@/app/_components/contentBox';

type AccountDetailPageProps = {
	params: {
		id: string;
	};
};

const AccountDetailPage = async ({ params }: AccountDetailPageProps) => {
	const status = await getServerAuthSession();
	if (!status) {
		redirect('/sign-in');
	}

	const account = await getFinancialAccountById(params.id);

	if (!account || status.user.id !== account.userId) {
		redirect('/accounts');
	}

	// TODO: Implement account detail page
	return (
		<div>
			<h1 className="mx-6 mt-6 text-3xl font-bold">Account Detail</h1>
			<ContentBox>
				<div className="flex items-center justify-center">
					<p>{account.name}</p>
				</div>
				<div className="flex items-center justify-center">
					<p>{account.description}</p>
				</div>
				<div className="flex items-center justify-center">
					<p>
						{account.currency} {account.balance}
					</p>
				</div>
			</ContentBox>
		</div>
	);
};

export default AccountDetailPage;
