import { financialAccountSchema } from '@/validators/financial-account';
import {
	type FinancialAccount,
	type NewFinancialAccount
} from '@/types/financial-account';

import { db } from '../db';

export const getFinancialAccountsByUserId = async (userId: string) => {
	const financialAccounts = await db.financialAccount.findMany({
		where: { userId }
	});

	return financialAccountSchema.array().parse(financialAccounts);
};

export const getFinancialAccountById = async (id: string) => {
	const financialAccount = await db.financialAccount.findUnique({
		where: { id }
	});

	return financialAccount
		? financialAccountSchema.parse(financialAccount)
		: null;
};

export const createFinancialAccount = async (
	financialAccount: NewFinancialAccount
) => {
	const newFinancialAccount = await db.financialAccount.create({
		data: {
			name: financialAccount.name,
			balance: 0,
			userId: financialAccount.userId,
			currency: financialAccount.currency,
			description: financialAccount.description
		}
	});
	return financialAccountSchema.parse(newFinancialAccount);
};

export const updateFinancialAccount = async (
	financialAccount: FinancialAccount
) => {
	const updatedFinancialAccount = await db.financialAccount.update({
		where: { id: financialAccount.id },
		data: {
			name: financialAccount.name,
			balance: financialAccount.balance,
			userId: financialAccount.userId,
			currency: financialAccount.currency,
			description: financialAccount.description
		}
	});

	return financialAccountSchema.parse(updatedFinancialAccount);
};

export const deleteFinancialAccount = async (id: string) => {
	const deletedFinancialAccount = await db.financialAccount.delete({
		where: { id }
	});

	return financialAccountSchema.parse(deletedFinancialAccount);
};
