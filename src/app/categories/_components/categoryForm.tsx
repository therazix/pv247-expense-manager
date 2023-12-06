'use client';

import { useContext } from 'react';

import { SelectedCategoryContext } from '../categoryProviders';

import { CategoryNameField } from './categoryNameField';
import { ColorField } from './colorField';
import CategoryFormProvider from './categoryFormProvider';
import IconField from './iconField';

export const CategoryForm = () => {
	const [selectedCategory] = useContext(SelectedCategoryContext);

	return (
		<CategoryFormProvider>
			<h2 className="border-b-2 border-dark-gunmetal p-6 text-xl text-white">
				{selectedCategory ? 'Edit Category' : 'New Category'}
			</h2>
			<CategoryNameField />
			<ColorField />
			<IconField />
		</CategoryFormProvider>
	);
};
