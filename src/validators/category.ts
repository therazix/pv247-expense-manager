import z from 'zod';

import { transactionSchema } from './transaction';

export const categoryCreateSchemaWithoutUserId = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	color: z.string().optional(),
	icon: z.string().optional()
});

export const categoryCreateSchema = categoryCreateSchemaWithoutUserId.extend({
	userId: z.string().min(1, { message: 'User ID is required' })
});

export const categorySchema = categoryCreateSchema.extend({
	id: z.string().min(1, { message: 'ID is required' }),
	transactions: z.array(transactionSchema).optional()
});
