import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import PasswordsSchema from '$lib/validators/PasswordsSchema';
import { validatePasswordResetToken } from '$lib/server/token';

export async function load({ parent }) {
	const { user } = await parent();
	if (user?.id) throw redirect(307, '/dashboard');

	const form = await superValidate(PasswordsSchema);
	return { form };
}

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const form = await superValidate(request, PasswordsSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		// basic check
		try {
			const { token } = params;
			const userId = await validatePasswordResetToken(token);
			let user = await auth.getUser(userId);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword('email', user.email, form.data.password);
			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: true
				});
			}
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			console.log(e);
			return fail(400, {
				message: 'Invalid or expired password reset link'
			});
		}
		throw redirect(302, '/');
	}
};
