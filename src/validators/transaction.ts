import z from 'zod';

export const transactionCreateSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().optional(),
	amount: z.number(),
	datetime: z.date(),
	financialAccountId: z.string().min(1, { message: 'Account ID is required' }),
	categoryId: z.string().optional()
});

export const transactionSchema = transactionCreateSchema.extend({
	id: z.string().min(1, { message: 'ID is required' })
});
