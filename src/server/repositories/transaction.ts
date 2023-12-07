import { transactionSchema } from '@/validators/transaction';
import { type NewTransaction } from '@/types/transaction';

import { db } from '../db';

export const getTransactionsByAccountId = async (
	financialAccountId: string
) => {
	const transactions = await db.transaction.findMany({
		where: { financialAccountId },
		include: { category: true }
	});
	return transactionSchema.array().parse(transactions);
};

export const getTransactionById = async (id: string) => {
	const transaction = await db.transaction.findUnique({
		where: { id },
		include: { financialAccount: true, category: true }
	});
	return transaction ? transactionSchema.parse(transaction) : null;
};

export const createTransaction = async (transaction: NewTransaction) => {
	const [newTransaction, _financialAcc] = await db.$transaction([
		db.transaction.create({
			data: {
				name: transaction.name,
				description: transaction.description,
				amount: transaction.amount,
				datetime: transaction.datetime,
				financialAccountId: transaction.financialAccountId,
				categoryId: transaction.categoryId
			},
			include: { category: true }
		}),
		db.financialAccount.update({
			where: { id: transaction.financialAccountId },
			data: {
				balance: {
					increment: transaction.amount
				}
			}
		})
	]);
	return transactionSchema.parse(newTransaction);
};

export const deleteTransaction = async (id: string) => {
	const transaction = await db.transaction.findUnique({
		where: { id },
		include: { financialAccount: true }
	});
	if (!transaction) throw new Error('Transaction not found');

	const [deletedTransaction, _financialAcc] = await db.$transaction([
		db.transaction.delete({ where: { id }, include: { category: true } }),
		db.financialAccount.update({
			where: { id: transaction.financialAccountId },
			data: {
				balance: {
					decrement: transaction.amount
				}
			}
		})
	]);
	return transactionSchema.parse(deletedTransaction);
};

export const getTransactionsByFinancialAccountId = async (
	financialAccountId: string
) => {
	const transactions = await db.transaction.findMany({
		where: { financialAccountId },
		include: { category: true }
	});
	return transactions;
};
