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
		redirect('/sign-in?callbackUrl=/accounts');
	}

	const userAccounts: FinancialAccount[] = await getFinancialAccountsByUserId(
		session.user.id
	);

	if (userAccounts.length === 0) {
		return (
			<div>
				<h1 className="mx-6 pt-6 text-center text-3xl font-bold sm:text-left">
					Accounts
				</h1>
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
			<h1 className="mx-6 pt-6 text-center text-3xl font-bold sm:text-left">
				Accounts
			</h1>
			<div className="flex flex-wrap">
				{userAccounts.map(account => (
					<div key={account.id} className="w-full xl:w-1/2">
						<AccountBox account={account} />
					</div>
				))}
				<AccountForm />
			</div>
		</div>
	);
};

export default AccountListPage;
