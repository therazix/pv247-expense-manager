'use client';

import { FaPenToSquare, FaTrashCan } from 'react-icons/fa6';
import { useContext, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import format from 'date-fns/format';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ContentBox from '@/app/_components/contentBox';
import FaIcon from '@/app/_components/faIcon';
import { type Category } from '@/types/category';

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
	const router = useRouter();
	const dialogRef = useContext(DialogRefContext);
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
				return await fetch(`/api/category/${category.id}`, {
					method: 'DELETE'
				});
			}

			// TODO: add error handling later
			console.log('ERROR');
			return new Response('Unauthorized', { status: 401 });
			// TODO: add error handling later
		},
		onError: () => {
			// TODO: add error handling later
			console.log('ERROR');
		}
	});

	useEffect(() => {
		if (deleteCategoryMutation.isSuccess) {
			const lastUpdate = format(new Date(), 'yyyy-MM-dd_HH:mm:ss');
			router.push(`/categories?lastUpdate=${lastUpdate}`);
		}
	}, [deleteCategoryMutation, router]);

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
