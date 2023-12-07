'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import format from 'date-fns/format';

import {
	type NewCategory,
	type NewCategoryWithoutUserId
} from '@/types/category';
import { categoryCreateSchemaWithoutUserId } from '@/validators/category';
import AddButton from '@/app/_components/addButton';
import Button from '@/app/_components/button';
import ButtonTransparent from '@/app/_components/buttonTransparent';
import Spinner from '@/app/_components/spinner';

import {
	DialogRefContext,
	SelectedCategoryContext
} from '../categoryProviders';
import useClearDialog from '../_hooks/useClearDialog';
import useAddOrEditCategoryMutation from '../_hooks/useAddOrEditCategoryMutation';

type CategoryFormProviderProps = {
	children: React.ReactNode;
};

const CategoryFormProvider = ({ children }: CategoryFormProviderProps) => {
	const [selectedCategory, setSelectedCategory] = useContext(
		SelectedCategoryContext
	);
	const [submitText, setSubmitText] = useState<string>('Add');

	const dialogRef = useContext(DialogRefContext);
	const router = useRouter();
	const { data: session, status } = useSession();

	const formMethods = useForm<NewCategoryWithoutUserId>({
		resolver: zodResolver(categoryCreateSchemaWithoutUserId)
	});

	const clearDialog = useClearDialog(
		formMethods,
		setSelectedCategory,
		setSubmitText
	);

	const addOrEditCategoryMutation = useAddOrEditCategoryMutation(
		selectedCategory,
		session,
		dialogRef,
		clearDialog
	);

	useEffect(() => {
		if (addOrEditCategoryMutation.isSuccess) {
			const lastUpdate = format(new Date(), 'yyyy-MM-dd_HH:mm:ss');
			router.push(`/categories?lastUpdate=${lastUpdate}`);
		}
	}, [addOrEditCategoryMutation, router]);

	useEffect(() => {
		if (selectedCategory) {
			formMethods.reset(
				categoryCreateSchemaWithoutUserId.parse(selectedCategory)
			);
		} else {
			clearDialog();
		}
	}, [selectedCategory, clearDialog, formMethods]);

	useEffect(() => {
		const newSubmitText = selectedCategory ? 'Update' : 'Add';
		setSubmitText(newSubmitText);
	}, [selectedCategory, setSubmitText]);

	const openDialog = () => {
		if (dialogRef.current !== null) {
			setSelectedCategory(null);
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

	const onSubmit = (data: NewCategoryWithoutUserId) => {
		setSubmitText('Saving...');

		const category: NewCategory = {
			...data,
			userId: session?.user.id
		};

		addOrEditCategoryMutation.mutate(category);
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

export default CategoryFormProvider;
