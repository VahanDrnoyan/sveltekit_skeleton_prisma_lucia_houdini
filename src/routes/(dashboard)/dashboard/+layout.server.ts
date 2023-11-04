import { getSessionUserFromDb } from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) return;
	console.log(session);
	return {
		user: await getSessionUserFromDb(session.user.userId)
	};
};
