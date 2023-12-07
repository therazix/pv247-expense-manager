'use client';

import { useContext } from 'react';

import { SelectedAccountContext } from '@/app/accounts/accountProviders';

import { AccountInputFields } from './accountInputFields';
import AccountFormProvider from './accountFormProvider';

export const AccountForm = () => {
	const [selectedAccount] = useContext(SelectedAccountContext);
	return (
		<AccountFormProvider>
			<h2 className="border-b-2 border-dark-gunmetal p-6 text-xl text-white">
				{selectedAccount ? 'Edit Account' : 'New Account'}
			</h2>
			<AccountInputFields />
		</AccountFormProvider>
	);
};
