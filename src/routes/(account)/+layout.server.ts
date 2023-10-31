import { getSessionUserFromDb } from '$lib/server/database';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) return;
	return {
		user: await getSessionUserFromDb(session.user.userId)
	};
};
