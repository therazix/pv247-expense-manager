import { useMutation } from '@tanstack/react-query';
import { type Session } from 'next-auth';
import { type RefObject } from 'react';

import { type Transaction, type NewTransaction } from '@/types/transaction';

const useAddOrEditTransactionMutation = (
	selectedTransaction: Transaction | null,
	session: Session | null,
	dialogRef: RefObject<HTMLDialogElement>,
	clearDialog: () => void
) =>
	useMutation({
		mutationFn: async (transaction: NewTransaction) => {
			if (selectedTransaction) {
				// TODO: check if selected accout is owned by user

				return await fetch(`/api/transaction/${selectedTransaction.id}`, {
					method: 'PUT',
					body: JSON.stringify(transaction)
				});

				// TODO: add error handling
			}

			return await fetch(`/api/transaction`, {
				method: 'POST',
				body: JSON.stringify(transaction)
			});
		},
		onSuccess: () => {
			clearDialog();
		},
		onError: () => {
			// TODO: add error handling
			console.log('ERROR');
		},
		onSettled: () => {
			if (dialogRef.current !== null) {
				dialogRef.current.close();
			}
		}
	});

export default useAddOrEditTransactionMutation;
