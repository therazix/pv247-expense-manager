import { getServerAuthSession } from '@/server/auth';
import {
	createFinancialAccount,
	getFinancialAccountsByUserId
} from '@/server/repositories/financialAccount';
import { financialAccountCreateSchema } from '@/validators/financial-account';

export const GET = async () => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const financialAccounts = await getFinancialAccountsByUserId(session.user.id);

	return new Response(JSON.stringify(financialAccounts), { status: 200 });
};

export const POST = async (req: Request) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const bodyJson = await req.json();
	try {
		const account = financialAccountCreateSchema.parse(bodyJson);
		const newAccount = await createFinancialAccount(account);

		return new Response(JSON.stringify(newAccount), { status: 201 });
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};
