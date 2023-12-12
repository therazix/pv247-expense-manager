import {
	getTransactionsByFinancialAccountId,
	updateTransaction
} from '@/server/repositories/transaction';
import { transactionCreateSchema } from '@/validators/transaction';
import { getServerAuthSession } from '@/server/auth';

export const GET = async (
	_req: Request,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	if (params.id) {
		const transactions = await getTransactionsByFinancialAccountId(params.id);
		return new Response(JSON.stringify(transactions), { status: 200 });
	} else {
		return new Response('Missing id', { status: 400 });
	}
};

export const PUT = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const bodyJson = await req.json();

	try {
		const transactionWithoutId = transactionCreateSchema.parse(bodyJson);
		const transaction = { ...transactionWithoutId, id };

		const updatedTransaction = await updateTransaction(transaction);

		return new Response(JSON.stringify(updatedTransaction), { status: 201 });
	} catch (error) {
		console.error(error);

		return new Response(`Transaction could not be updated: ${error}`, {
			status: 500
		});
	}
};
