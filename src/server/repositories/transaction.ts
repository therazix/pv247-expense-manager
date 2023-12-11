import { transactionSchema } from '@/validators/transaction';
import {
	type TransactionSearchParams,
	type NewTransaction,
	type Transaction
} from '@/types/transaction';

import { db } from '../db';

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

export const updateTransaction = async (transaction: Transaction) => {
	const updatedTransaction = await db.transaction.update({
		where: { id: transaction.id },
		data: {
			name: transaction.name,
			description: transaction.description,
			amount: transaction.amount,
			datetime: transaction.datetime,
			financialAccountId: transaction.financialAccountId,
			categoryId: transaction.categoryId
		}
	});
	return transactionSchema.parse(updatedTransaction);
};

export const deleteTransaction = async (id: string) => {
	const transaction = await db.transaction.findUnique({
		where: { id }
	});
	if (!transaction) throw new Error('Transaction not found');

	const deletedTransaction = deleteTransactionTransaction(
		transaction as Transaction
	);
	return transactionSchema.parse(deletedTransaction);
};

const deleteTransactionTransaction = async (transaction: Transaction) => {
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
		const deletedTransaction = await deleteTransactionTransaction(
			transaction as Transaction
		);

		deletedTransactions.push(deletedTransaction as Transaction);
	}

	return transactionSchema.parse(deletedTransactions);
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
	let whereFilter = {};

	if (transactionSearchParams.categoryId) {
		whereFilter = {
			...whereFilter,
			categoryId: { equals: transactionSearchParams.categoryId }
		};
	}

	if (transactionSearchParams.financialAccountId) {
		whereFilter = {
			...whereFilter,
			financialAccountId: { equals: transactionSearchParams.financialAccountId }
		};
	}

	const transactions = await db.transaction.findMany({
		where: {
			financialAccount: { userId: { equals: transactionSearchParams.userId } },
			...whereFilter
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
			dateString: transaction.datetime.toLocaleDateString()
		}))
	);
};
