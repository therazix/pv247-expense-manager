import { transactionSchema } from '@/validators/transaction';
import {
	type TransactionSearchParams,
	type NewTransaction,
	type Transaction,
	type UpdateTransaction
} from '@/types/transaction';
import { parseDate } from '@/utils';

import { db } from '../db';

export const getTransactionById = async (id: string) => {
	const transaction = await db.transaction.findUnique({
		where: { id },
		include: { financialAccount: true, category: true }
	});
	return transaction
		? transactionSchema.parse({
				...transaction,
				dateString: parseDate(transaction.date)
		  })
		: null;
};

export const createTransaction = async (transaction: NewTransaction) => {
	let data = {
		name: transaction.name,
		description: transaction.description,
		amount: transaction.amount,
		date: transaction.dateString
			? new Date(transaction.dateString)
			: new Date(),
		financialAccountId: transaction.financialAccountId,
		categoryId: transaction.categoryId
	};
	if (transaction.categoryId) {
		data = {
			...data,
			categoryId: transaction.categoryId
		};
	}
	const [newTransaction, _financialAcc] = await db.$transaction([
		db.transaction.create({
			data,
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

export const updateTransaction = async (transaction: UpdateTransaction) => {
	const oldTransaction = await db.transaction.findUnique({
		where: { id: transaction.id },
		select: { amount: true }
	});
	if (!oldTransaction) throw new Error('Transaction not found');

	const amountDiff = transaction.amount - oldTransaction.amount;

	const [updatedTransaction, _] = await db.$transaction([
		db.transaction.update({
			where: { id: transaction.id },
			data: {
				name: transaction.name ?? null,
				description: transaction.description ?? null,
				amount: transaction.amount,
				date: transaction.dateString
					? new Date(transaction.dateString)
					: new Date(),
				financialAccount: {
					connect: { id: transaction.financialAccountId }
				},
				category: transaction.categoryId
					? {
							connect: { id: transaction.categoryId }
					  }
					: {
							disconnect: true
					  }
			}
		}),
		db.financialAccount.update({
			where: { id: transaction.financialAccountId },
			data: {
				balance: {
					increment: amountDiff
				}
			}
		})
	]);
	return transactionSchema.parse({
		...updatedTransaction,
		dateString: parseDate(updatedTransaction.date),
		categoryId: updatedTransaction.categoryId ?? undefined
	});
};

const deleteTransaction = async (transaction: Transaction) => {
	const [deletedTransaction, _financialAcc] = await db.$transaction([
		db.transaction.delete({
			where: { id: transaction.id },
			include: { category: true }
		}),
		db.financialAccount.update({
			where: { id: transaction.financialAccountId },
			data: {
				balance: {
					decrement: transaction.amount
				}
			}
		})
	]);

	return deletedTransaction;
};

export const deleteTransactions = async (ids: string[]) => {
	const transactions = await db.transaction.findMany({
		where: { id: { in: ids } },
		include: { financialAccount: true }
	});
	if (!transactions) throw new Error('Transaction not found');

	const deletedTransactions: Transaction[] = [];

	for (const transaction of transactions) {
		const deletedTransaction = await deleteTransaction(
			transaction as Transaction
		);

		deletedTransactions.push(deletedTransaction as Transaction);
	}

	return transactionSchema.array().parse(
		deletedTransactions.map(t => ({
			...t,
			dateString: parseDate(t.date),
			categoryId: t.categoryId ?? undefined
		}))
	);
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

export const searchTransactions = async (
	transactionSearchParams: TransactionSearchParams
) => {
	const transactions = await db.transaction.findMany({
		where: {
			financialAccount: { userId: { equals: transactionSearchParams.userId } },
			categoryId: transactionSearchParams.categoryId,
			financialAccountId: transactionSearchParams.financialAccountId
		},
		include: {
			category: { select: { name: true } },
			financialAccount: { select: { name: true } }
		}
	});

	return transactionSchema.array().parse(
		transactions.map(transaction => ({
			...transaction,
			categoryId:
				transaction.categoryId === null ? undefined : transaction.categoryId, // Why it throws zodError without this?
			categoryName: transaction.category?.name,
			financialAccountName: transaction.financialAccount?.name,
			dateString: parseDate(transaction.date)
		}))
	);
};
