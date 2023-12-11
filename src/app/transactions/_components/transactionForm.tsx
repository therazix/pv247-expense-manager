'use client';

import { useContext } from 'react';

import { SelectedTransactionContext } from '../transactionProviders';

import TransactionFormProvider from './transactionFormProvider';
import TransactionNameField from './transactionNameField';
import TransactionDescriptionField from './transactionDescriptionField';
import TransactionAmountField from './transactionAmountField';
import TransactionDateField from './transactionDateField';
import TransactionAccountField from './transactionAccountField';
import TransactionCategoryField from './transactionCategoryField';

export const TransactionForm = () => {
	const [selectedTransaction] = useContext(SelectedTransactionContext);

	return (
		<TransactionFormProvider>
			<h2 className="border-b-2 border-dark-gunmetal p-6 text-xl text-white">
				{selectedTransaction ? 'Edit Transaction' : 'New Transaction'}
			</h2>
			<div className="flex flex-row flex-wrap gap-3 px-6 md:flex-nowrap">
				<TransactionNameField />
				<TransactionAmountField />
			</div>
			<div className="mb-3 flex flex-row flex-wrap gap-3 px-6 md:flex-nowrap">
				<TransactionAccountField />
				<TransactionCategoryField />
				<TransactionDateField />
			</div>
			<TransactionDescriptionField />
		</TransactionFormProvider>
	);
};
