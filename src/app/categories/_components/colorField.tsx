'use client';

import { useFormContext } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';

import { type NewCategory } from '@/types/category';
import { selectableColors } from '@/constants/selectables';
import IconButton from '@/app/_components/iconButton';

import { SelectedCategoryContext } from '../categoryProviders';

export const ColorField = () => {
	const [selectedCategory] = useContext(SelectedCategoryContext);
	const { register, setValue } = useFormContext<NewCategory>();
	const [selectedColor, setSelectedColor] = useState<string>('');

	const onColorClick = (color: string) => {
		if (selectedColor === color) {
			setValue('color', '');
			setSelectedColor('');
			return;
		}

		setValue('color', color);
		setSelectedColor(color);
	};

	useEffect(() => {
		setValue('color', selectedCategory?.color ?? '');
		setSelectedColor(selectedCategory?.color ?? '');
	}, [selectedCategory?.color, setValue]);

	return (
		<div className="mb-3 px-6">
			<label htmlFor="color">Color</label>s
			<input type="hidden" {...register('color')} />
			<div className="mt-2 flex flex-row gap-3">
				{Object.keys(selectableColors).map(color => (
					<div key={color}>
						<IconButton
							iconSelectableColor={color}
							selectableColor={color}
							onClick={() => onColorClick(color)}
							className={
								color === selectedColor
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
