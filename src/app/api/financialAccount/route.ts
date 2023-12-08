import { createFinancialAccount } from '@/server/repositories/financialAccount';
import { financialAccountCreateSchema } from '@/validators/financial-account';

export const POST = async (req: Request) => {
	const bodyJson = await req.json();
	try {
		const account = financialAccountCreateSchema.parse(bodyJson);
		const newAccount = await createFinancialAccount(account);

		return new Response(JSON.stringify(newAccount), { status: 201 });
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};
