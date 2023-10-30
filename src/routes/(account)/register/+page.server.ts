import { fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'

import { auth } from '$lib/server/auth'
import UserRegistrationSchema from '$lib/validators/UserRegistrationSchema.js'
import { LuciaError } from 'lucia-auth'
import { page } from "$app/stores"
// if the user exists, redirect authenticated users to the profile page
export async function load({parent}) {
	const {userId} = await parent();
	if (userId) throw redirect(307, '/');

	const form = await superValidate(UserRegistrationSchema)
	return { form }
}

export const actions = {
	async default({ request, locals }) {
		const form = await superValidate(request, UserRegistrationSchema)

		if (!form.valid) {
			return fail(400, { form })
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: form.data.email,
					password: form.data.password,	
				},
				attributes: {
					username: form.data.username,
					email: form.data.email,
				},
			})
			const session = await auth.createSession({userId:user.userId, attributes: {}})
			locals.auth.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError && e.message === `AUTH_INVALID_USER_ID`) {
				return fail(403, { form })
			}
		}
		throw redirect(302, '/')
	}
}
