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
	return categorySchema.parse(category);
};

export const createCategory = async (category: NewCategory) => {
	const newCategory = await db.category.create({
		data: {
			name: category.name,
			userId: category.userId
		}
	});
	return categorySchema.parse(newCategory);
};

export const renameCategory = async (category: Category) => {
	const updatedCategory = await db.category.update({
		where: { id: category.id },
		data: { name: category.name }
	});
	return categorySchema.parse(updatedCategory);
};

export const deleteCategory = async (id: string) => {
	const deletedCategory = await db.category.delete({
		where: { id }
	});
	return categorySchema.parse(deletedCategory);
};
