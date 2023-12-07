import { NextResponse } from 'next/server';

import { getFinancialAccountsByUserId } from '@/server/repositories/financialAccount';

export const GET = async (
	request: Request,
	{ params }: { params: { id: string } }
) => {
	if (params.id) {
		const financialAccounts = await getFinancialAccountsByUserId(params.id);
		console.log('>>>>', financialAccounts);
		return NextResponse.json(financialAccounts);
	} else {
		return NextResponse.json({ error: 'Missing id' }, { status: 400 });
	}
};
