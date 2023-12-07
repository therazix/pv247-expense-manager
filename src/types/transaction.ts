import { type z } from 'zod';

import {
	type transactionCreateSchema,
	type transactionSchema
} from '@/validators/transaction';

export type Transaction = z.infer<typeof transactionSchema>;
export type NewTransaction = z.infer<typeof transactionCreateSchema>;
export type TransactionEnhanced = Transaction & {
	category: {
		id: string;
		name: string;
		color: string;
		icon: string;
	};
};
