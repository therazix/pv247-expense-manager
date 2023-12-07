import { useMutation } from '@tanstack/react-query';
import { type Session } from 'next-auth';
import { type RefObject } from 'react';

import { type Category, type NewCategory } from '@/types/category';

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

export default useAddOrEditCategoryMutation;
