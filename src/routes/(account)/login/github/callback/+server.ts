import { auth, githubAuth } from '$lib/server/auth';
import { getUserByEmail } from '$lib/server/database.js';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('github_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');
	// validate state
	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, {
			status: 400
		});
	}
	try {
		const { getExistingUser, githubUser, createUser, createKey } =
			await githubAuth.validateCallback(code);
		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) return existingUser;
			const existingDatabaseUserWithEmail = await getUserByEmail(githubUser.email);
			if (existingDatabaseUserWithEmail) {
				// transform `UserSchema` to `User`
				const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail);
				await createKey(user.userId);
				return user;
			}
			return await createUser({
				attributes: {
					email: githubUser.email
				}
			});
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};
