import { redirect } from 'next/navigation';

import { type TransactionSearchParams } from '@/types/transaction';
import { getServerAuthSession } from '@/server/auth';
import { searchTransactions } from '@/server/repositories/transaction';

import { TransactionForm } from './_components/transactionForm';
import TransactionTable from './_components/transactionTable';

const TransactionListPage = async ({
	searchParams
}: {
	searchParams: TransactionSearchParams;
}) => {
	const session = await getServerAuthSession();

	if (!session) {
		redirect('/sign-in?callbackUrl=/transactions');
	}

	const transactions = await searchTransactions({
		...searchParams,
		userId: session.user.id
	});

	return (
		<div>
			<h1 className="mx-6 py-6 text-center text-3xl font-bold sm:text-left">
				Transactions
			</h1>
			<div className="h-[80vh] w-full overflow-auto px-6 pb-6 lg:h-[87vh] lg:max-h-[90vh] xl:max-h-full">
				<TransactionTable transactions={transactions} />
			</div>
			<TransactionForm />
		</div>
	);
};
export default TransactionListPage;
