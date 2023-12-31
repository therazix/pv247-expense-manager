import { userSchema } from '@/validators/user';

import { db } from '../db';

export const getAllUsers = async () => {
	const users = await db.user.findMany();
	return userSchema.array().parse(users);
};

export const getUserById = async (id: string) => {
	const user = await db.user.findUnique({
		where: { id },
		include: { financialAccounts: true, categories: true }
	});
	return user ? userSchema.parse(user) : null;
};

export const getUserByEmail = async (email: string) => {
	const user = await db.user.findUnique({
		where: { email },
		include: { financialAccounts: true, categories: true }
	});
	return userSchema.parse(user);
};
