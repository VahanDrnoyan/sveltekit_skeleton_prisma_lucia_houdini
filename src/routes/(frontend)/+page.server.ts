import { redirect, type Actions, fail } from '@sveltejs/kit'
import { auth } from '$lib/server/auth'

export const actions: Actions = {
	logout: async (data) => {
		const session = await data.locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		data.locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/'); // redirect to login page
	},
};
