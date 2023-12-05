'use client';

import {
	createContext,
	type RefObject,
	type PropsWithChildren,
	useState,
	useRef
} from 'react';

import { type Category } from '@/types/category';

type LastUpdatedContextState = [string | null, (lastUpdated: string) => void];
type SelectedCategoryContextState = [
	Category | null,
	(category: Category | null) => void
];

export const LastUpdatedContext = createContext<LastUpdatedContextState>(
	undefined as never
);

export const DialogRefContext = createContext<RefObject<HTMLDialogElement>>(
	undefined as never
);

export const SelectedCategoryContext =
	createContext<SelectedCategoryContextState>(undefined as never);

const CategoryProviders = ({ children }: PropsWithChildren) => {
	const lastUpdatedState = useState<string | null>(null);
	const selectedCategory = useState<Category | null>(null);
	const categoryDialogRef = useRef<HTMLDialogElement | null>(null);

	return (
		<LastUpdatedContext.Provider value={lastUpdatedState}>
			<SelectedCategoryContext.Provider value={selectedCategory}>
				<DialogRefContext.Provider value={categoryDialogRef}>
					{children}
				</DialogRefContext.Provider>
			</SelectedCategoryContext.Provider>
		</LastUpdatedContext.Provider>
	);
};

export default CategoryProviders;
