import { useMutation } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import type { RefObject } from 'react';

import type {
	FinancialAccount,
	NewFinancialAccount
} from '@/types/financial-account';

const useAddOrEditAccountMutation = (
	selectedAccount: FinancialAccount | null,
	session: Session | null,
	dialogRef: RefObject<HTMLDialogElement>,
	clearDialog: () => void
) =>
	useMutation({
		mutationFn: async (account: NewFinancialAccount) => {
			if (selectedAccount) {
				if (session?.user.id === selectedAccount.userId) {
					return await fetch(`/api/account/${selectedAccount.id}`, {
						method: 'PUT',
						body: JSON.stringify(account)
					});
				}
				// TODO: add error handling later
				console.log('ERROR');
				return new Response('Unauthorized', { status: 401 });
				// TODO: add error handling later
			}

			return await fetch(`/api/account`, {
				method: 'POST',
				body: JSON.stringify(account)
			});
		},
		onSuccess: () => {
			clearDialog();
		},
		onError: () => {
			// TODO: add error handling later
			console.log('ERROR');
		},
		onSettled: () => {
			if (dialogRef.current !== null) {
				dialogRef.current.close();
			}
		}
	});

export default useAddOrEditAccountMutation;
