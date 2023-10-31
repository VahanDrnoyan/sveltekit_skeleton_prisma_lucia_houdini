import { fail, redirect } from '@sveltejs/kit'
import { superValidate, setError } from 'sveltekit-superforms/server'

import { auth } from '$lib/server/auth.js'
import { authSchema } from '$lib/validators/UserLoginSchema.js'
import { LuciaError } from 'lucia-auth'

// if the user exists, redirect authenticated users to the profile page
export async function load({parent}) {
	const {user} = await parent();
	if (user?.id) throw redirect(307, '/dashboard');

	const form = await superValidate(authSchema)
	return { form }
}

export const actions = {
	async default({ request, locals }) {
		const form = await superValidate(request, authSchema)

		if (!form.valid) {
			return fail(400, { form })
		}

		try {

			const key = await auth.useKey(
				'email',
				form.data.email,
				form.data.password
			)

			const session = await auth.createSession({userId:key.userId, attributes: {}})
			locals.auth.setSession(session)
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
			return setError(form, 'email', 'Email or password invalid.')
			}
		}
	},
}
