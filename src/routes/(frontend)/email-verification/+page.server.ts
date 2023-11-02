import { redirect, type Actions, fail } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { generateEmailVerificationToken } from '$lib/server/token';
import { sendEmailVerificationLink } from '$lib/server/email';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user) throw redirect(302, '/login');
	if (user.email_verified) {
		throw redirect(302, '/dashboard');
	}
	return {};
};
export const actions: Actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/login');
		if (!session.user) throw redirect(302, '/login');
		if (session.user.email_verified) {
			throw redirect(302, '/');
		}
		try {
			const token = await generateEmailVerificationToken(session.user.id);
			await sendEmailVerificationLink(session.user.email, token);
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
