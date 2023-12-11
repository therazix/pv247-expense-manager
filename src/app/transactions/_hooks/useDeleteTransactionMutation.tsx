import { useMutation } from '@tanstack/react-query';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { createTimestamp } from '@/utils';

const useDeleteTransactionMutation = (
	router: AppRouterInstance,
	setLastUpdate: (lastUpdate: string) => void
) =>
	useMutation({
		mutationFn: async (transactionId: string) => {
			await fetch(`/api/transaction/${transactionId}`, {
				method: 'DELETE'
			});
		},
		onSuccess: () => {
			const lastUpdate = createTimestamp();
			setLastUpdate(lastUpdate);
			router.push(`/transactions?lastUpdate=${lastUpdate}`); // TODO: need to preserve query params
		},
		onError: () => {
			// TODO: add error handling
			console.log('ERROR');
		}
	});

export default useDeleteTransactionMutation;
