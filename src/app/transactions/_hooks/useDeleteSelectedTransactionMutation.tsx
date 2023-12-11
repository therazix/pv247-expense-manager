import { useMutation } from '@tanstack/react-query';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { createTimestamp } from '@/utils';

const useDeleteSelectedTransactionMutation = (
	router: AppRouterInstance,
	setLastUpdate: (lastUpdate: string) => void
) =>
	useMutation({
		mutationFn: async (selectedIds: string[]) => {
			await fetch(`/api/transaction`, {
				method: 'DELETE',
				body: JSON.stringify(selectedIds)
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

export default useDeleteSelectedTransactionMutation;
