import { redirect, type Actions, fail } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { generateEmailVerificationToken } from "$lib/server/token"
import { sendEmailVerificationLink } from "$lib/server/email"

export const load: PageServerLoad = async ({ parent }) => {
	const {user} = await parent();
	if (!user) throw redirect(302, "/login");
	if (user.email_verified) {
		throw redirect(302, "/dashboard");
	}
	return {};
};
export const actions: Actions = {
	default: async ({ locals }) => {
		const user = await locals.auth.user;
		if (!user) throw redirect(302, "/login");
		if (user.email_verified) {
			throw redirect(302, "/");
		}
		try {
			const token = await generateEmailVerificationToken(user.id);
			await sendEmailVerificationLink(user.email,token);
			return {
				success: true
			};
		} catch {
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
	}
};