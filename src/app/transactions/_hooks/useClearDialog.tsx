import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type Transaction, type NewTransaction } from '@/types/transaction';

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
			datetime: new Date(), // does not set today's date
			categoryId: '',
			financialAccountId: undefined
		});
		setSelectedTransaction(null);
		setSubmitText('Add');
	}, [formMethods, setSelectedTransaction, setSubmitText]);

export default useClearDialog;
