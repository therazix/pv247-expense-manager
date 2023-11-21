import z from 'zod';

export const financialAccountCreateSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().optional(),
	balance: z.number(),
	currency: z.string().min(1, { message: 'Currency is required' }),
	userId: z.string().min(1, { message: 'User ID is required' })
});

export const financialAccountSchema = financialAccountCreateSchema.extend({
	id: z.string().min(1, { message: 'ID is required' })
});
