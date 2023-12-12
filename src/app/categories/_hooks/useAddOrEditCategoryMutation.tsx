import { useMutation } from '@tanstack/react-query';
import { type Session } from 'next-auth';
import { type RefObject } from 'react';
import { toast } from 'react-toastify';

import { type Category, type NewCategory } from '@/types/category';
import { formatErrResponse } from '@/utils';

const useAddOrEditCategoryMutation = (
	selectedCategory: Category | null,
	session: Session | null,
	dialogRef: RefObject<HTMLDialogElement>,
	clearDialog: () => void
) =>
	useMutation({
		mutationFn: async (category: NewCategory) => {
			if (selectedCategory) {
				if (session?.user.id === selectedCategory.userId) {
					const response = await fetch(`/api/category/${selectedCategory.id}`, {
						method: 'PUT',
						body: JSON.stringify(category)
					});
					if (!response.ok) {
						throw new Error(await formatErrResponse(response));
					}
					return response;
				}
				throw new Error('Unauthorized');
			}

			const response = await fetch(`/api/category`, {
				method: 'POST',
				body: JSON.stringify(category)
			});
			if (!response.ok) {
				throw new Error(await formatErrResponse(response));
			}
			return response;
		},
		onSuccess: () => {
			clearDialog();
		},
		onError: error => {
			console.error(error);
			toast.error(error.message);
		},
		onSettled: () => {
			if (dialogRef.current !== null) {
				dialogRef.current.close();
			}
		}
	});

export default useAddOrEditCategoryMutation;
