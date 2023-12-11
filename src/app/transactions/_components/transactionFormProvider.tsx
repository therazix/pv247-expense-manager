'use client';

import { useContext, useEffect, useState } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import format from 'date-fns/format';

import { type NewTransaction } from '@/types/transaction';
import Spinner from '@/app/_components/spinner';
import AddButton from '@/app/_components/addButton';
import ButtonTransparent from '@/app/_components/buttonTransparent';
import Button from '@/app/_components/button';
import { transactionCreateSchema } from '@/validators/transaction';
import { createTimestamp } from '@/utils';
import { useLastUpdateContext } from '@/store/lastUpdate';

import {
	DialogRefContext,
	SelectedTransactionContext
} from '../transactionProviders';
import useClearDialog from '../_hooks/useClearDialog';
import useAddOrEditTransactionMutation from '../_hooks/useAddOrEditTransactionMutation';

type TransactionFormProviderProps = {
	children: React.ReactNode;
};

const TransactionFormProvider = ({
	children
}: TransactionFormProviderProps) => {
	const [selectedTransaction, setSelectedTransaction] = useContext(
		SelectedTransactionContext
	);
	const [submitText, setSubmitText] = useState<string>('Add');
	const [lastUpdate, setLastUpdate] = useLastUpdateContext();

	const dialogRef = useContext(DialogRefContext);
	const router = useRouter();
	const searchParams = useSearchParams();
	const { data: session, status } = useSession();

	const formMethods = useForm<NewTransaction>({
		resolver: zodResolver(transactionCreateSchema)
	});

	const clearDialog = useClearDialog(
		formMethods,
		setSelectedTransaction,
		setSubmitText
	);

	const addOrEditTransactionMutation = useAddOrEditTransactionMutation(
		selectedTransaction,
		session,
		dialogRef,
		clearDialog
	);

	useEffect(() => {
		if (addOrEditTransactionMutation.isSuccess) {
			const lastUpdate = createTimestamp();
			setLastUpdate(lastUpdate);

			const financialAccountId = searchParams.get('financialAccountId');
			const categoryId = searchParams.get('categoryId');
			let href = `/transactions?lastUpdate=${lastUpdate}`;

			if (financialAccountId) {
				href += `&financialAccountId=${financialAccountId}`;
			}
			if (categoryId) {
				href += `&categoryId=${categoryId}`;
			}

			router.push(href);
		}
	}, [
		addOrEditTransactionMutation,
		setLastUpdate,
		lastUpdate,
		searchParams,
		router
	]);

	useEffect(() => {
		// TODO: date is not selected when editing transaction
		if (selectedTransaction) {
			formMethods.reset(transactionCreateSchema.parse(selectedTransaction));
		} else {
			clearDialog();
		}
	}, [selectedTransaction, clearDialog, formMethods]);

	useEffect(() => {
		const newSubmitText = selectedTransaction ? 'Update' : 'Add';
		setSubmitText(newSubmitText);
	}, [selectedTransaction, setSubmitText]);

	const openDialog = () => {
		if (dialogRef.current !== null) {
			setSelectedTransaction(null);
			dialogRef.current.showModal();
		}
	};

	const closeDialog = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (dialogRef.current !== null) {
			dialogRef.current.close();
		}
	};

	if (status === 'loading') {
		return <Spinner />;
	}
	if (!session) {
		redirect('/sign-in');
	}

	const onSubmit = (transaction: NewTransaction) => {
		setSubmitText('Saving...');

		addOrEditTransactionMutation.mutate(transaction);
	};

	return (
		<>
			<AddButton className="absolute bottom-0 right-0" onClick={openDialog} />
			<div>
				<dialog
					ref={dialogRef}
					className="w-full rounded-2xl bg-yankees-blue drop-shadow-2xl

                backdrop:backdrop-blur-sm sm:w-5/6 md:w-[35rem] [&[open]]:flex"
				>
					<FormProvider {...formMethods}>
						<form
							onSubmit={formMethods.handleSubmit(data => onSubmit(data))}
							className="flex w-full flex-col gap-3 text-white"
						>
							{children}
							<div className="flex flex-row justify-between gap-6 pb-6 pl-6 pr-6">
								<ButtonTransparent
									text="Close"
									className="w-2/5"
									onClick={closeDialog}
								/>
								<Button text={submitText} type="submit" className="w-3/5" />
							</div>
						</form>
					</FormProvider>
				</dialog>
			</div>
		</>
	);
};

export default TransactionFormProvider;
