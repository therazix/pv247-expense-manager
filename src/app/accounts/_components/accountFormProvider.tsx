'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getUnixTime } from 'date-fns';

import {
	type NewFinancialAccount,
	type NewFinancialAccountWithoutUserId
} from '@/types/financial-account';
import {
	financialAccountCreateSchema,
	financialAccountCreateSchemaWithoutUserId
} from '@/validators/financial-account';
import AddButton from '@/app/_components/addButton';
import Button from '@/app/_components/button';
import ButtonTransparent from '@/app/_components/buttonTransparent';
import Spinner from '@/app/_components/spinner';
import { useLastUpdateContext } from '@/store/lastUpdate';

import { DialogRefContext, SelectedAccountContext } from '../accountProviders';
import useClearDialog from '../_hooks/useClearDialog';
import useAddOrEditAccountMutation from '../_hooks/useAddOrEditAccountMutation';

type AccountFormProviderProps = {
	children: React.ReactNode;
};

const AccountFormProvider = ({ children }: AccountFormProviderProps) => {
	const [selectedAccount, setSelectedAccount] = useContext(
		SelectedAccountContext
	);
	const [, setLastUpdate] = useLastUpdateContext();
	const dialogRef = useContext(DialogRefContext);

	const [submitText, setSubmitText] = useState<string>('Add');

	const router = useRouter();
	const { data: session, status } = useSession();

	const formMethods = useForm<NewFinancialAccountWithoutUserId>({
		resolver: zodResolver(financialAccountCreateSchemaWithoutUserId)
	});

	const clearDialog = useClearDialog(
		formMethods,
		setSelectedAccount,
		setSubmitText
	);

	const addOrEditAccountMutation = useAddOrEditAccountMutation(
		selectedAccount,
		session,
		dialogRef,
		clearDialog
	);

	useEffect(() => {
		if (addOrEditAccountMutation.isSuccess) {
			const lastUpdate = getUnixTime(new Date()).toString();
			setLastUpdate(lastUpdate);
			router.push(`/accounts?lastUpdate=${lastUpdate}`);
		}
	}, [addOrEditAccountMutation, router, setLastUpdate]);

	useEffect(() => {
		if (selectedAccount) {
			formMethods.reset(financialAccountCreateSchema.parse(selectedAccount));
		} else {
			clearDialog();
		}
	}, [selectedAccount, clearDialog, formMethods]);

	useEffect(() => {
		const newSubmitText = selectedAccount ? 'Update' : 'Add';
		setSubmitText(newSubmitText);
	}, [selectedAccount, setSubmitText]);

	const openDialog = () => {
		if (dialogRef.current !== null) {
			setSelectedAccount(null);
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

	const onSubmit = (data: NewFinancialAccountWithoutUserId) => {
		setSubmitText('Saving...');

		const account: NewFinancialAccount = {
			...data,
			userId: session?.user.id
		};

		addOrEditAccountMutation.mutate(account);
	};

	return (
		<>
			<AddButton className="absolute bottom-0 right-0" onClick={openDialog} />
			<div>
				<dialog
					ref={dialogRef}
					className="w-full rounded-2xl bg-yankees-blue drop-shadow-2xl

	            backdrop:backdrop-blur-sm sm:w-5/6 md:w-96 [&[open]]:flex"
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

export default AccountFormProvider;
