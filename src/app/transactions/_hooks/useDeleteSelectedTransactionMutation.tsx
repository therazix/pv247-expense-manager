import { useMutation } from '@tanstack/react-query';
import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { createTimestamp, formatErrResponse } from '@/utils';

const useDeleteSelectedTransactionMutation = (
	router: AppRouterInstance,
	setLastUpdate: (lastUpdate: string) => void
) => {
	const searchParams = useSearchParams();

	return useMutation({
		mutationFn: async (selectedIds: string[]) => {
			const response = await fetch(`/api/transaction`, {
				method: 'DELETE',
				body: JSON.stringify(selectedIds)
			});
			if (!response.ok) {
				throw new Error(await formatErrResponse(response));
			}
			return response;
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
		onError: error => {
			console.error(error);
			toast.error(error.message);
		}
	});
};

export default useDeleteSelectedTransactionMutation;
