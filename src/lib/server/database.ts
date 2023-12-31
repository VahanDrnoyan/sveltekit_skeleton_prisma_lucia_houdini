import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
export default db;

export const getSessionUserFromDb = (id: string) => {
	return db.user.findUnique({
		where: {
			id: id
		}
	});
};
export const getUserByEmail = (email: string | null = null) => {
	if (email) {
		return db.user.findUnique({
			where: {
				email
			}
		});
	}
};
