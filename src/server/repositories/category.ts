import { categorySchema } from '@/validators/category';
import { type Category, type NewCategory } from '@/types/category';

import { db } from '../db';

export const getCategoriesByUserId = async (userId: string) => {
	const categories = await db.category.findMany({
		where: { userId }
	});
	return categorySchema.array().parse(categories);
};

export const getCategoryById = async (id: string) => {
	const category = await db.category.findUnique({
		where: { id },
		include: { user: true, transactions: true }
	});
	return category ? categorySchema.parse(category) : null;
};

export const createCategory = async (category: NewCategory) => {
	const newCategory = await db.category.create({
		data: {
			name: category.name,
			color: category.color,
			icon: category.icon,
			userId: category.userId
		}
	});
	return categorySchema.parse(newCategory);
};

export const updateCategory = async (category: Category) => {
	const updatedCategory = await db.category.update({
		where: { id: category.id },
		data: {
			name: category.name,
			color: category.color,
			icon: category.icon
		}
	});
	return categorySchema.parse(updatedCategory);
};

export const deleteCategory = async (id: string) => {
	const deletedCategory = await db.category.delete({
		where: { id }
	});
	return categorySchema.parse(deletedCategory);
};
