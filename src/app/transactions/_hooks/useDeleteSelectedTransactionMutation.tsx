import { useMutation } from '@tanstack/react-query';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams } from 'next/navigation';

import { createTimestamp } from '@/utils';

const useDeleteSelectedTransactionMutation = (
	router: AppRouterInstance,
	setLastUpdate: (lastUpdate: string) => void
) => {
	const searchParams = useSearchParams();

	return useMutation({
		mutationFn: async (selectedIds: string[]) => {
			await fetch(`/api/transaction`, {
				method: 'DELETE',
				body: JSON.stringify(selectedIds)
			});
		},
		onSuccess: () => {
			const lastUpdate = createTimestamp();
			setLastUpdate(lastUpdate);

			const financialAccountId = searchParams.get('financialAccountId');
			const categoryId = searchParams.get('categoryId');
			let href = `/transactions?lastUpdate=${lastUpdate}`;

			if (financialAccountId) {
				href += `&financialAccountId=${financialAccountId}`;
			}
			if (categoryId) {
				href += `&categoryId=${categoryId}`;
			}

			router.push(href);
		},
		onError: () => {
			// TODO: add error handling
			console.log('ERROR');
		}
	});
};

export default useDeleteSelectedTransactionMutation;
