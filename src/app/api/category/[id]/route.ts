import { deleteCategory, updateCategory } from '@/server/repositories/category';
import { categoryCreateSchema } from '@/validators/category';

export const PUT = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	const bodyJson = await req.json();

	try {
		const categoryWithoutId = categoryCreateSchema.parse(bodyJson);
		const category = { ...categoryWithoutId, id };

		const updatedCategory = await updateCategory(category);

		return new Response(JSON.stringify(updatedCategory), { status: 201 });
	} catch (error) {
		console.log(error);

		return new Response('Something went wrong', { status: 500 });
	}
};

export const DELETE = async (
	_req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	try {
		await deleteCategory(id);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.log(error);

		return new Response('Something went wrong', { status: 500 });
	}
};
