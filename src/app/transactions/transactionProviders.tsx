'use client';

import {
	createContext,
	type RefObject,
	type PropsWithChildren,
	useState,
	useRef
} from 'react';

import { type Transaction } from '@/types/transaction';

type SelectedTransactionContextState = [
	Transaction | null,
	(transaction: Transaction | null) => void
];

export const DialogRefContext = createContext<RefObject<HTMLDialogElement>>(
	undefined as never
);

export const SelectedTransactionContext =
	createContext<SelectedTransactionContextState>(undefined as never);

const TransactionProviders = ({ children }: PropsWithChildren) => {
	const selectedTransaction = useState<Transaction | null>(null);

	const transactionDialogRef = useRef<HTMLDialogElement | null>(null);

	return (
		<SelectedTransactionContext.Provider value={selectedTransaction}>
			<DialogRefContext.Provider value={transactionDialogRef}>
				{children}
			</DialogRefContext.Provider>
		</SelectedTransactionContext.Provider>
	);
};

export default TransactionProviders;
