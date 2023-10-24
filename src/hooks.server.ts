import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import prisma from '$lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Credentials from '@auth/core/providers/credentials';

export const authorization: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [
			GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
			Credentials({
				// The name to display on the sign in form (e.g. 'Sign in with...')
				name: 'Credentials',
				// The credentials is used to generate a suitable form on the sign in page.
				// You can specify whatever fields you are expecting to be submitted.
				// e.g. domain, username, password, 2FA token, etc.
				credentials: {
					username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
					password: { label: 'Password', type: 'password' }
				},
				async authorize(credentials) {
					// You need to provide your own logic here that takes the credentials
					// submitted and returns either a object representing a user or value
					// that is false/null if the credentials are invalid.
					// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
					// You can also use the `req` object to obtain additional parameters
					// (i.e., the request IP address)
					const res = await fetch('/your/endpoint', {
						method: 'POST',
						body: JSON.stringify(credentials),
						headers: { 'Content-Type': 'application/json' }
					});
					const user = await res.json();

					// If no error and we have user data, return it
					if (res.ok && user) {
						return user;
					}
					// Return null if user data could not be retrieved
					return null;
				}
			})
		],
		adapter: PrismaAdapter(prisma)
	}),
	authorization
);
