'use client';

import { useFormContext } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import { type NewCategory } from '@/types/category';
import { selectableIcons } from '@/constants/selectables';
import IconButton from '@/app/_components/iconButton';

import { SelectedCategoryContext } from '../categoryProviders';

const IconField = () => {
	const [selectedCategory] = useContext(SelectedCategoryContext);
	const { register, setValue } = useFormContext<NewCategory>();
	const [selectedIcon, setSelectedIcon] = useState<string>('');

	const onIconClick = (icon: string) => {
		if (selectedCategory?.icon === icon) {
			setValue('icon', '');
			setSelectedIcon('');
			return;
		}

		setValue('icon', icon);
		setSelectedIcon(icon);
	};

	useEffect(() => {
		setValue('icon', selectedCategory?.icon ?? '');
		setSelectedIcon(selectedCategory?.icon ?? '');
	}, [selectedCategory?.icon, setValue]);

	return (
		<div className="mb-6 px-6">
			<label htmlFor="icon">Icon</label>
			<input type="hidden" {...register('icon')} />
			<div className="mt-2 flex flex-row gap-3">
				{selectableIcons.map(icon => (
					<div key={icon}>
						<IconButton
							icon={icon}
							onclick={() => onIconClick(icon)}
							className={
								icon === selectedIcon
									? 'border-2 border-white'
									: 'border-2 border-yankees-blue'
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default IconField;
