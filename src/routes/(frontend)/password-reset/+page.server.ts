import { auth } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generatePasswordResetToken } from '$lib/server/token';
import { sendPasswordResetLink } from '$lib/server/email';

import type { Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { emailSchema } from '$lib/validators/EmailSchema';
import db from '$lib/server/database';

export async function load({ parent }) {
	const { user } = await parent();
	if (user?.id) throw redirect(307, '/dashboard');

	const form = await superValidate(emailSchema);
	return { form };
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, emailSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const storedUser = await db.user.findUnique({
				where: {
					email: form.data.email
				}
			});

			if (!storedUser) {
				return fail(400, {
					message: 'User does not exist'
				});
			}
			const user = auth.transformDatabaseUser(storedUser);
			const token = await generatePasswordResetToken(user.userId);
			await sendPasswordResetLink(form.data.email, token);
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/');
	}
};
