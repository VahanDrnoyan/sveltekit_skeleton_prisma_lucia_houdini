import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

import { auth } from '$lib/server/auth';
import UserRegistrationSchema from '$lib/validators/UserRegistrationSchema.js';
import { generateEmailVerificationToken } from '$lib/server/token.js';
import { sendEmailVerificationLink } from '$lib/server/email.js';
// if the user exists, redirect authenticated users to the profile page
export async function load({ parent }) {
	const { user } = await parent();
	if (user) {
		if (!user.email_verified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}

	const form = await superValidate(UserRegistrationSchema);
	return { form };
}

export const actions = {
	async default({ request, locals }) {
		const form = await superValidate(request, UserRegistrationSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: form.data.email,
					password: form.data.password
				},
				attributes: {
					username: form.data.username,
					email: form.data.email
				}
			});
			console.log(user, 9999);

			const session = await auth.createSession({ userId: user.userId, attributes: {} });
			locals.auth.setSession(session);
			const token = await generateEmailVerificationToken(user.userId);
			await sendEmailVerificationLink(user.email, token);
		} catch (e) {
			return fail(403, { form });
		}
		throw redirect(302, '/');
	}
};
