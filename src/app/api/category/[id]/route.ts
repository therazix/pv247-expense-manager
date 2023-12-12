import {
	deleteCategory,
	getCategoryById,
	updateCategory
} from '@/server/repositories/category';
import { categoryCreateSchema } from '@/validators/category';
import { getServerAuthSession } from '@/server/auth';

export const GET = async (
	_req: Request,
	{ params }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	if (params.id) {
		const category = await getCategoryById(params.id);
		return new Response(JSON.stringify(category), { status: 200 });
	} else {
		return new Response('Category does not exist', { status: 400 });
	}
};

export const PUT = async (
	req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const bodyJson = await req.json();

	try {
		const categoryWithoutId = categoryCreateSchema.parse(bodyJson);
		const category = { ...categoryWithoutId, id };

		const updatedCategory = await updateCategory(category);

		return new Response(JSON.stringify(updatedCategory), { status: 201 });
	} catch (error) {
		console.log(error);

		return new Response('Category could not be updated', { status: 500 });
	}
};

export const DELETE = async (
	_req: Request,
	{ params: { id } }: { params: { id: string } }
) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	try {
		await deleteCategory(id);

		return new Response(null, { status: 204 });
	} catch (error) {
		console.log(error);

		return new Response('Category could not be deleted', { status: 500 });
	}
};
