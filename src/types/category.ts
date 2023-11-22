import { type z } from 'zod';

import {
	type categoryCreateSchema,
	type categorySchema
} from '@/validators/category';

export type Category = z.infer<typeof categorySchema>;
export type NewCategory = z.infer<typeof categoryCreateSchema>;
