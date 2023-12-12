import { useMutation } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { toast } from 'react-toastify';

import type { FinancialAccount } from '@/types/financial-account';
import { formatErrResponse } from '@/utils';

const useDeleteAccountMutation = (session: Session | null) =>
	useMutation({
		mutationFn: async (account: FinancialAccount) => {
			if (session?.user.id === account.userId) {
				const response = await fetch(`/api/financialAccount/${account.id}`, {
					method: 'DELETE'
				});
				if (!response.ok) {
					throw new Error(await formatErrResponse(response));
				}
				return response;
			}
			throw new Error('Unauthorized');
		},
		onError: error => {
			console.error(error);
			toast.error(error.message);
		}
	});

export default useDeleteAccountMutation;
