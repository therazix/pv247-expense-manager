import { type z } from 'zod';

import {
	type financialAccountCreateSchema,
	type financialAccountCreateSchemaWithoutUserId,
	type financialAccountSchema
} from '@/validators/financial-account';

export type FinancialAccount = z.infer<typeof financialAccountSchema>;
export type NewFinancialAccount = z.infer<typeof financialAccountCreateSchema>;
export type NewFinancialAccountWithoutUserId = z.infer<
	typeof financialAccountCreateSchemaWithoutUserId
>;
