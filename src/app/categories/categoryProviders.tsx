'use client';

import {
	createContext,
	type RefObject,
	type PropsWithChildren,
	useState,
	useRef
} from 'react';

import { type Category } from '@/types/category';

type SelectedCategoryContextState = [
	Category | null,
	(category: Category | null) => void
];

export const DialogRefContext = createContext<RefObject<HTMLDialogElement>>(
	undefined as never
);

export const SelectedCategoryContext =
	createContext<SelectedCategoryContextState>(undefined as never);

const CategoryProviders = ({ children }: PropsWithChildren) => {
	const selectedCategory = useState<Category | null>(null);
	const categoryDialogRef = useRef<HTMLDialogElement | null>(null);

	return (
		<SelectedCategoryContext.Provider value={selectedCategory}>
			<DialogRefContext.Provider value={categoryDialogRef}>
				{children}
			</DialogRefContext.Provider>
		</SelectedCategoryContext.Provider>
	);
};

export default CategoryProviders;
