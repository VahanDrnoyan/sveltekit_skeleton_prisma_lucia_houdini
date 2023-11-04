import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user) throw redirect(302, '/login');
	if (!user.email_verified) {
		throw redirect(302, '/email-verification');
	}
};
