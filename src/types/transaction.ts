import { type z } from 'zod';

import {
	type transactionSearchSchema,
	type transactionCreateSchema,
	type transactionSchema,
	type transactionUpdateSchema
} from '@/validators/transaction';

export type Transaction = z.infer<typeof transactionSchema>;
export type NewTransaction = z.infer<typeof transactionCreateSchema>;
export type UpdateTransaction = z.infer<typeof transactionUpdateSchema>;
export type TransactionSearchParams = z.infer<typeof transactionSearchSchema>;
export type ChartTransaction = Transaction & {
	category: {
		id: string;
		name: string;
		color: string;
		icon: string;
	};
};
