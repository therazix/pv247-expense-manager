import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type Transaction, type NewTransaction } from '@/types/transaction';
import { parseDate } from '@/utils';

const useClearDialog = (
	formMethods: UseFormReturn<NewTransaction>,
	setSelectedTransaction: (transaction: Transaction | null) => void,
	setSubmitText: (submitText: string) => void
) =>
	useCallback(() => {
		formMethods.reset({
			name: '',
			description: '',
			amount: 0,
			dateString: parseDate(new Date()),
			categoryId: '',
			financialAccountId: undefined
		});
		setSelectedTransaction(null);
		setSubmitText('Add');
	}, [formMethods, setSelectedTransaction, setSubmitText]);

export default useClearDialog;
