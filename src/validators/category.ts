import z from 'zod';

import { transactionSchema } from './transaction';

export const categoryCreateSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	color: z.string().optional(),
	icon: z.string().optional(),
	userId: z.string().min(1, { message: 'User ID is required' })
});

export const categorySchema = z.object({
	id: z.string().min(1, { message: 'ID is required' }),
	name: z.string().min(1, { message: 'Name is required' }),
	color: z.string().optional(),
	icon: z.string().optional(),
	transactions: z.array(transactionSchema).optional()
});
