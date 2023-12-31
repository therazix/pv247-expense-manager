'use client';

import { useQuery } from '@tanstack/react-query';

import { type FinancialAccount } from '@/types/financial-account';
import { type ChartTransaction } from '@/types/transaction';

export const useGetTransaction = (id: string | null) =>
	useQuery({
		queryKey: ['get', 'transaction', id],
		queryFn: async () => {
			const response = await fetch(`/api/transaction/${id}`);
			return (await response.json()) as ChartTransaction[];
		}
	});

export const useGetUniqueFinancialAccount = (id: string | null) =>
	useQuery({
		queryKey: ['get', 'financialAccount', id],
		queryFn: async () => {
			const response = await fetch(`/api/financialAccount/${id}`);
			return (await response.json()) as FinancialAccount;
		}
	});
