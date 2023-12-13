import type { Metadata } from 'next';

import TransactionProviders from './transactionProviders';

export const metadata: Metadata = {
	title: 'Transactions'
};

const TransactionLayout = ({ children }: { children: React.ReactNode }) => (
	<TransactionProviders>
		<div className="h-screen grow ">{children}</div>
	</TransactionProviders>
);

export default TransactionLayout;
