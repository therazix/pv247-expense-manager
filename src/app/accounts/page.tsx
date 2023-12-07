import { redirect } from 'next/navigation';

import { getServerAuthSession } from '@/server/auth';
import { getFinancialAccountsByUserId } from '@/server/repositories/financialAccount';
import { type FinancialAccount } from '@/types/financial-account';
import AccountBox from '@/app/accounts/_components/accountBox';
import { AccountForm } from '@/app/accounts/_components/accountForm';

import ContentBox from '../_components/contentBox';

const AccountListPage = async () => {
	const session = await getServerAuthSession();

	if (!session) {
		redirect('/sign-in');
	}

	const userAccounts: FinancialAccount[] = await getFinancialAccountsByUserId(
		session.user.id
	);

	if (userAccounts.length === 0) {
		return (
			<div>
				<h1 className="mx-6 mt-6 text-3xl font-bold">Accounts</h1>
				<ContentBox>
					<div className="flex items-center justify-center">
						<p>You have no account yet</p>
					</div>
					<AccountForm />
				</ContentBox>
			</div>
		);
	}

	return (
		<div>
			<h1 className="mx-6 mt-6 text-3xl font-bold">Accounts</h1>
			<div className="flex flex-wrap">
				{userAccounts.map(account => (
					<div key={account.id} className="w-full md:w-1/2 xl:w-1/3">
						<AccountBox account={account} />
					</div>
				))}
				<AccountForm />
			</div>
		</div>
	);
};

export default AccountListPage;
