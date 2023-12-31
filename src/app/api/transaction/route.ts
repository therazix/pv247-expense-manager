import {
	createTransaction,
	deleteTransactions
} from '@/server/repositories/transaction';
import { transactionCreateSchema } from '@/validators/transaction';
import { getServerAuthSession } from '@/server/auth';

export const POST = async (req: Request) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const bodyJson = await req.json();

	try {
		const transaction = transactionCreateSchema.parse(bodyJson);

		if (!transaction.categoryId) {
			transaction.categoryId = undefined;
		}

		const newTransaction = await createTransaction(transaction);

		return new Response(JSON.stringify(newTransaction), { status: 201 });
	} catch (error) {
		return new Response('Transaction could not be created', { status: 500 });
	}
};

export const DELETE = async (req: Request) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const bodyJson = await req.json();
	try {
		const transactionIds = [...bodyJson];

		await deleteTransactions(transactionIds);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);

		return new Response('Transaction could not be deleted', { status: 500 });
	}
};
