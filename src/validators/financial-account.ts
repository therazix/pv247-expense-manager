import z from 'zod';

export const financialAccountCreateSchemaWithoutUserId = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	description: z.string().optional(),
	currency: z.string().min(1, { message: 'Currency is required' })
});

export const financialAccountCreateSchema =
	financialAccountCreateSchemaWithoutUserId.extend({
		userId: z.string().min(1, { message: 'User ID is required' })
	});

export const financialAccountSchema = financialAccountCreateSchema.extend({
	id: z.string().min(1, { message: 'ID is required' }),
	balance: z.number()
});
