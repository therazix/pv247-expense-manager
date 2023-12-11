import z from 'zod';

// TODO: rename datetime to date
export const transactionCreateSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	amount: z.coerce.number(),
	datetime: z.coerce.date(),
	financialAccountId: z.string().min(1, { message: 'Account ID is required' }),
	categoryId: z.string().optional()
});

export const transactionSchema = transactionCreateSchema.extend({
	id: z.string().min(1, { message: 'ID is required' }),
	categoryName: z.string().optional(),
	financialAccountName: z.string().optional(),
	dateString: z.string().optional()
});

export const transactionSearchSchema = z.object({
	userId: z.string().optional(),
	categoryId: z.string().optional(),
	financialAccountId: z.string().optional()
});
