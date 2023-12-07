'use client';

import {
	createContext,
	type RefObject,
	type PropsWithChildren,
	useState,
	useRef
} from 'react';

import { type FinancialAccount } from '@/types/financial-account';

type SelectedAccountContextState = [
	FinancialAccount | null,
	(account: FinancialAccount | null) => void
];

export const DialogRefContext = createContext<RefObject<HTMLDialogElement>>(
	undefined as never
);

export const SelectedAccountContext =
	createContext<SelectedAccountContextState>(undefined as never);

const AccountProviders = ({ children }: PropsWithChildren) => {
	const selectedAccount = useState<FinancialAccount | null>(null);
	const accountDialogRef = useRef<HTMLDialogElement | null>(null);

	return (
		<SelectedAccountContext.Provider value={selectedAccount}>
			<DialogRefContext.Provider value={accountDialogRef}>
				{children}
			</DialogRefContext.Provider>
		</SelectedAccountContext.Provider>
	);
};

export default AccountProviders;
