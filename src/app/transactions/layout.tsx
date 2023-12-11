import TransactionProviders from './transactionProviders';

const TransactionLayout = ({ children }: { children: React.ReactNode }) => (
	<TransactionProviders>
		<div className="h-screen grow ">{children}</div>
	</TransactionProviders>
);

export default TransactionLayout;
