import { useCallback } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { type NewCategoryWithoutUserId, type Category } from '@/types/category';

const useClearDialog = (
	formMethods: UseFormReturn<NewCategoryWithoutUserId>,
	setSelectedCategory: (category: Category | null) => void,
	setSubmitText: (submitText: string) => void
) =>
	useCallback(() => {
		formMethods.reset({
			name: '',
			icon: undefined,
			color: undefined
		});
		setSelectedCategory(null);
		setSubmitText('Add');
	}, [formMethods, setSelectedCategory, setSubmitText]);

export default useClearDialog;
