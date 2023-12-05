import { createCategory } from '@/server/repositories/category';
import { categoryCreateSchema } from '@/validators/category';

export const POST = async (req: Request) => {
	const bodyJson = await req.json();

	try {
		const category = categoryCreateSchema.parse(bodyJson);

		const newCategory = await createCategory(category);

		return new Response(JSON.stringify(newCategory), { status: 201 });
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};
