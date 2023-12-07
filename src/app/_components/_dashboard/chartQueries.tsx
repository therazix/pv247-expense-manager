'use client';

import { useQuery } from '@tanstack/react-query';

import { type TransactionEnhanced } from '@/types/transaction';

export const useGetTransaction = (id: string) =>
	useQuery({
		queryKey: ['get', 'transaction', id],
		queryFn: async () => {
			const response = await fetch(`api/transaction/${id}`);
			return (await response.json()) as TransactionEnhanced[];
		}
	});
