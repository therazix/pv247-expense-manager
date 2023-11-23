import z from 'zod';

import { financialAccountSchema } from './financial-account';
import { categorySchema } from './category';

export const userSchema = z.object({
	id: z.string().min(1, { message: 'ID is required' }),
	name: z.string(),
	email: z.string(),
	image: z.string().optional(),
	createdAt: z.date().optional(),
	categories: z.array(categorySchema).optional(),
	financialAccounts: z.array(financialAccountSchema).optional()
});
