import { getFinancialAccountsByUserId } from '@/server/repositories/financialAccount';

export const GET = async (
	_req: Request,
	{ params }: { params: { id: string } }
) => {
	if (params.id) {
		const financialAccounts = await getFinancialAccountsByUserId(params.id);
		return new Response(JSON.stringify(financialAccounts), { status: 200 });
	} else {
		return new Response('Missing id', { status: 400 });
	}
};
