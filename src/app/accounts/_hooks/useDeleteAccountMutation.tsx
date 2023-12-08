import { useMutation } from '@tanstack/react-query';
import type { Session } from 'next-auth';

import type { FinancialAccount } from '@/types/financial-account';

const useDeleteAccountMutation = (session: Session | null) =>
	useMutation({
		mutationFn: async (account: FinancialAccount) => {
			if (session?.user.id === account.userId) {
				return await fetch(`/api/financialAccount/${account.id}`, {
					method: 'DELETE'
				});
			}

			// TODO: add error handling later
			console.log('ERROR');
			return new Response('Unauthorized', { status: 401 });
			// TODO: add error handling later
		},
		onError: () => {
			// TODO: add error handling later
			console.log('ERROR');
		}
	});

export default useDeleteAccountMutation;
