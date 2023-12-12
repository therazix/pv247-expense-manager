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
		return new Response('Something went wrong', { status: 500 });
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

		console.log('DELETE API');
		console.log(transactionIds);
		await deleteTransactions(transactionIds);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.log(error);

		return new Response('Something went wrong', { status: 500 });
	}
};
