import {
	deleteFinancialAccount,
	getFinancialAccountById,
	updateFinancialAccount
} from '@/server/repositories/financialAccount';
import { financialAccountCreateSchema } from '@/validators/financial-account';
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
		const financialAccount = await getFinancialAccountById(params.id);
		return new Response(JSON.stringify(financialAccount), { status: 200 });
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
		const account = financialAccountCreateSchema.parse(bodyJson);
		const updatedAccount = { ...account, id };
		const result = await updateFinancialAccount(updatedAccount);

		return new Response(JSON.stringify(result), { status: 201 });
	} catch (error) {
		console.error(error);

		return new Response('Account could not be updated', { status: 500 });
	}
};

export const DELETE = async (
	_req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	try {
		await deleteFinancialAccount(id);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);

		return new Response('Account could not be deleted', { status: 500 });
	}
};
