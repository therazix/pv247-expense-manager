import { getAllUsers } from '@/server/repositories/user';

export const GET = async (_req: Request) => {
	const users = await getAllUsers();

	return Response.json(users);
};
