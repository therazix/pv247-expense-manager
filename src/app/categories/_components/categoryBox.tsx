'use client';

import { FaPenToSquare, FaTrashCan } from 'react-icons/fa6';
import { useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import ContentBox from '@/app/_components/contentBox';
import FaIcon from '@/app/_components/faIcon';
import { type Category } from '@/types/category';
import { useLastUpdateContext } from '@/store/lastUpdate';
import { createTimestamp, formatErrResponse } from '@/utils';

import {
	DialogRefContext,
	SelectedCategoryContext
} from '../categoryProviders';

type CategoryBoxProps = {
	category: Category;
};

const defaultBgColor = 'dark-gunmetal';

const CategoryBox = ({ category }: CategoryBoxProps) => {
	const [, setSelectedCategory] = useContext(SelectedCategoryContext);
	const [, setLastUpdate] = useLastUpdateContext();
	const dialogRef = useContext(DialogRefContext);

	const router = useRouter();
	const { data: session } = useSession();

	const iconBgSelectableColor =
		category.color !== '' ? category.color : defaultBgColor;

	const openDialog = () => {
		if (dialogRef.current !== null) {
			setSelectedCategory(category);
			dialogRef.current.showModal();
		}
	};

	const deleteCategoryMutation = useMutation({
		mutationFn: async (category: Category) => {
			if (session?.user.id === category.userId) {
				const response = await fetch(`/api/category/${category.id}`, {
					method: 'DELETE'
				});
				if (!response.ok) {
					throw new Error(await formatErrResponse(response));
				}
				return response;
			}

			throw new Error('Unauthorized');
		},
		onError: error => {
			console.error(error);
			toast.error(error.message);
		}
	});

	useEffect(() => {
		if (deleteCategoryMutation.isSuccess) {
			const lastUpdate = createTimestamp();
			setLastUpdate(lastUpdate);
			router.push(`/categories?lastUpdate=${lastUpdate}`);
		}
	}, [deleteCategoryMutation, router, setLastUpdate]);

	return (
		<ContentBox>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<div
						className={`bg-${iconBgSelectableColor} mr-6 flex h-10 w-10 self-center rounded p-3`}
					>
						<FaIcon icon={category.icon} />
					</div>
					<div>
						<p className="text-base text-cool-grey">{category.name}</p>
					</div>
				</div>
				<div className="flex flex-row gap-3">
					<button onClick={openDialog}>
						<FaPenToSquare />
					</button>
					<button onClick={() => deleteCategoryMutation.mutate(category)}>
						<FaTrashCan />
					</button>
				</div>
			</div>
		</ContentBox>
	);
};

export default CategoryBox;
