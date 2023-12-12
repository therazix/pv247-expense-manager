import { getServerAuthSession } from '@/server/auth';
import {
	createCategory,
	getCategoriesByUserId
} from '@/server/repositories/category';
import { categoryCreateSchema } from '@/validators/category';

export const GET = async () => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const categories = await getCategoriesByUserId(session.user.id);

	return new Response(JSON.stringify(categories), { status: 200 });
};

export const POST = async (req: Request) => {
	const session = await getServerAuthSession();

	if (!session) {
		return new Response('Unauthorized access', { status: 401 });
	}

	const bodyJson = await req.json();

	try {
		const category = categoryCreateSchema.parse(bodyJson);

		const newCategory = await createCategory(category);

		return new Response(JSON.stringify(newCategory), { status: 201 });
	} catch (error) {
		return new Response('Category could not be created', { status: 500 });
	}
};
