'use client';

import { FaPenToSquare, FaTrashCan } from 'react-icons/fa6';
import { useContext } from 'react';

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
	const dialogRef = useContext(DialogRefContext);

	const iconBgSelectableColor =
		category.color !== '' ? category.color : defaultBgColor;

	const openDialog = () => {
		if (dialogRef.current !== null) {
			setSelectedCategory(category);
			dialogRef.current.showModal();
		}
	};

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
					<button>
						<FaTrashCan />
					</button>
				</div>
			</div>
		</ContentBox>
	);
};

export default CategoryBox;
