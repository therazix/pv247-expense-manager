import { useMutation } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import type { RefObject } from 'react';
import { toast } from 'react-toastify';

import type {
	FinancialAccount,
	NewFinancialAccount
} from '@/types/financial-account';
import { formatErrResponse } from '@/utils';

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
					const response = await fetch(
						`/api/financialAccount/${selectedAccount.id}`,
						{
							method: 'PUT',
							body: JSON.stringify(account)
						}
					);
					if (!response.ok) {
						throw new Error(await formatErrResponse(response));
					}
					return response;
				}
				throw new Error('Unauthorized');
			}

			const response = await fetch(`/api/financialAccount`, {
				method: 'POST',
				body: JSON.stringify(account)
			});
			if (!response.ok) {
				throw new Error(await formatErrResponse(response));
			}
		},
		onSuccess: () => {
			clearDialog();
		},
		onError: error => {
			console.error(error);
			toast.error(error.message);
		},
		onSettled: () => {
			if (dialogRef.current !== null) {
				dialogRef.current.close();
			}
		}
	});

export default useAddOrEditAccountMutation;
