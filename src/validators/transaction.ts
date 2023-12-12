import z from 'zod';

export const transactionCreateSchema = z.object({
	name: z.string().optional(),
	description: z.string().optional(),
	amount: z.coerce.number(),
	dateString: z.string().optional(),
	financialAccountId: z.string().min(1, { message: 'Account ID is required' }),
	categoryId: z.string().optional()
});

export const transactionUpdateSchema = transactionCreateSchema.extend({
	id: z.string().min(1, { message: 'ID is required' })
});

export const transactionSchema = transactionUpdateSchema.extend({
	categoryName: z.string().optional(),
	financialAccountName: z.string().optional(),
	date: z.date()
});

export const transactionSearchSchema = z.object({
	userId: z.string().optional(),
	categoryId: z.string().optional(),
	financialAccountId: z.string().optional()
});
