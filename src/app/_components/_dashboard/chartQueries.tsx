'use client';

import { useQuery } from '@tanstack/react-query';

import { type TransactionEnhanced } from '@/types/transaction';
import { type FinancialAccount } from '@/types/financial-account';

export const useGetTransaction = (id: string) =>
	useQuery({
		queryKey: ['get', 'transaction', id],
		queryFn: async () => {
			const response = await fetch(`api/transaction/${id}`);
			return (await response.json()) as TransactionEnhanced[];
		}
	});

export const useGetUniqueFinancialAccount = (id: string) =>
	useQuery({
		queryKey: ['get', 'unique', 'financialAccount', id],
		queryFn: async () => {
			const response = await fetch(`api/financialAccount/unique/${id}`);
			return (await response.json()) as FinancialAccount;
		}
	});
