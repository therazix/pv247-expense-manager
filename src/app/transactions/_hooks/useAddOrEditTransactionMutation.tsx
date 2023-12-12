import { useMutation } from '@tanstack/react-query';
import { type Session } from 'next-auth';
import { type RefObject } from 'react';
import { toast } from 'react-toastify';

import { type Transaction, type NewTransaction } from '@/types/transaction';
import type { FinancialAccount } from '@/types/financial-account';
import { formatErrResponse } from '@/utils';

const useAddOrEditTransactionMutation = (
	selectedTransaction: Transaction | null,
	session: Session | null,
	dialogRef: RefObject<HTMLDialogElement>,
	clearDialog: () => void
) =>
	useMutation({
		mutationFn: async (transaction: NewTransaction) => {
			if (selectedTransaction) {
				const accountJson = await fetch(
					`/api/financialAccount/${selectedTransaction.financialAccountId}`
				);
				if (!accountJson.ok) {
					throw new Error(await formatErrResponse(accountJson));
				}
				const account = (await accountJson.json()) as FinancialAccount;

				if (account.userId !== session?.user?.id) {
					throw new Error('You do not own this account');
				}

				const response = await fetch(
					`/api/transaction/${selectedTransaction.id}`,
					{
						method: 'PUT',
						body: JSON.stringify(transaction)
					}
				);
				if (!response.ok) {
					throw new Error(await formatErrResponse(response));
				}
				return response;
			}

			const response = await fetch(`/api/transaction`, {
				method: 'POST',
				body: JSON.stringify(transaction)
			});
			if (!response.ok) {
				throw new Error(await formatErrResponse(response));
			}
			return response;
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

export default useAddOrEditTransactionMutation;
