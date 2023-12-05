import { type z } from 'zod';

import {
	type categoryCreateSchemaWithoutUserId,
	type categoryCreateSchema,
	type categorySchema
} from '@/validators/category';

export type Category = z.infer<typeof categorySchema>;
export type NewCategoryWithoutUserId = z.infer<
	typeof categoryCreateSchemaWithoutUserId
>;
export type NewCategory = z.infer<typeof categoryCreateSchema>;
