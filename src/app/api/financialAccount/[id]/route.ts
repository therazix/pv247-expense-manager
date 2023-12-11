import { NextResponse } from 'next/server';

import {
	deleteFinancialAccount,
	getFinancialAccountById,
	updateFinancialAccount
} from '@/server/repositories/financialAccount';
import { financialAccountCreateSchema } from '@/validators/financial-account';

export const GET = async (
	_req: Request,
	{ params }: { params: { id: string } }
) => {
	if (params.id) {
		const financialAccount = await getFinancialAccountById(params.id);
		return NextResponse.json(financialAccount);
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
		const account = financialAccountCreateSchema.parse(bodyJson);
		const updatedAccount = { ...account, id };
		const result = await updateFinancialAccount(updatedAccount);

		return new Response(JSON.stringify(result), { status: 201 });
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
		await deleteFinancialAccount(id);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.log(error);

		return new Response('Something went wrong', { status: 500 });
	}
};
