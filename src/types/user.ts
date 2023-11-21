import { type z } from 'zod';

import { type userSchema } from '@/validators/user';

export type User = z.infer<typeof userSchema>;
