import { NextResponse } from 'next/server';

import { getTransactionsByFinancialAccountId } from '@/server/repositories/transaction';

export const GET = async (
	request: Request,
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
