import { NextResponse } from 'next/server';

import {
	deleteTransaction,
	getTransactionsByFinancialAccountId,
	updateTransaction
} from '@/server/repositories/transaction';
import { transactionSchema } from '@/validators/transaction';

export const GET = async (
	_req: Request,
	{ params }: { params: { id: string } }
) => {
	if (params.id) {
		return NextResponse.json(
			await getTransactionsByFinancialAccountId(params.id)
		);
	} else {
		return NextResponse.json({ error: 'Missing id' }, { status: 400 });
	}
};

export const PUT = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	const bodyJson = await req.json();

	try {
		const transaction = transactionSchema.parse(bodyJson);

		const updatedTransaction = await updateTransaction(transaction);

		return new Response(JSON.stringify(updatedTransaction), { status: 201 });
	} catch (error) {
		console.log(error);

		return new Response('Something went wrong', { status: 500 });
	}
};

export const DELETE = async (
	_req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await deleteTransaction(id);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.log(error);

		return new Response('Something went wrong', { status: 500 });
	}
};
