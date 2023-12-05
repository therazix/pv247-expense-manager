'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
	const { data: session } = useSession();

	const formMethods = useForm<NewCategoryWithoutUserId>({
		resolver: zodResolver(categoryCreateSchemaWithoutUserId)
	});

	const clearDialog = useClearDialog(
		formMethods,
		setSelectedCategory,
		setSubmitText
	);

	const addOrEditCategoryMutation = useMutation({
		mutationFn: async (category: NewCategory) => {
			if (selectedCategory) {
				if (session?.user.id === selectedCategory.userId) {
					return await fetch(`/api/category/${selectedCategory.id}`, {
						method: 'PUT',
						body: JSON.stringify(category)
					});
				}
				// TODO: add error handling later
				console.log('ERROR');
				return new Response('Unauthorized', { status: 401 });
				// TODO: add error handling later
			}

			return await fetch(`/api/category`, {
				method: 'POST',
				body: JSON.stringify(category)
			});
		},
		onSuccess: () => {
			clearDialog();
		},
		onError: () => {
			// TODO: add error handling later
			console.log('ERROR');
		},
		onSettled: () => {
			if (dialogRef.current !== null) {
				dialogRef.current.close();
			}
		}
	});

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
	}, [selectedCategory, setSelectedCategory, clearDialog, formMethods]);

	useEffect(() => {
		const newSubmitText = selectedCategory ? 'Update' : 'Add';
		setSubmitText(newSubmitText);
	}, [selectedCategory, setSelectedCategory]);

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

	if (!session) {
		return <Spinner />;
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
			<AddButton className="absolute bottom-0 right-0" onclick={openDialog} />
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
									onclick={closeDialog}
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
