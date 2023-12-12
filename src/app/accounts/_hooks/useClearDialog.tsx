import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import {
	type NewFinancialAccountWithoutUserId,
	type FinancialAccount
} from '@/types/financial-account';

const useClearDialog = (
	formMethods: UseFormReturn<NewFinancialAccountWithoutUserId>,
	setSelectedAccount: (account: FinancialAccount | null) => void,
	setSubmitText: (submitText: string) => void
) =>
	useCallback(() => {
		formMethods.reset({
			name: '',
			currency: '',
			description: ''
		});
		setSelectedAccount(null);
		setSubmitText('Add');
	}, [formMethods, setSelectedAccount, setSubmitText]);

export default useClearDialog;
