import { type z } from 'zod';

import {
	type financialAccountCreateSchema,
	type financialAccountCreateSchemaWithoutUserId,
	type financialAccountSchema,
	type financialAccountUpdateSchema
} from '@/validators/financial-account';

export type FinancialAccount = z.infer<typeof financialAccountSchema>;
export type FinancialAccountWithoutBalance = z.infer<
	typeof financialAccountUpdateSchema
>;
export type NewFinancialAccount = z.infer<typeof financialAccountCreateSchema>;
export type NewFinancialAccountWithoutUserId = z.infer<
	typeof financialAccountCreateSchemaWithoutUserId
>;
