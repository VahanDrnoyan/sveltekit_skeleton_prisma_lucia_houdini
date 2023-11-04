import { lucia } from 'lucia';
import { prisma } from '@lucia-auth/adapter-prisma';
import { sveltekit } from 'lucia/middleware';

import db from './database';
import { dev } from '$app/environment';
import 'lucia/polyfill/node';
import { facebook, github, google } from '@lucia-auth/oauth/providers';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FACEBOOK_CLIENT_ID,
	FACEBOOK_CLIENT_SECRET
} from '$env/static/private';
export const auth = lucia({
	adapter: prisma(db, {
		user: 'user',
		key: 'key',
		session: 'session'
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			email_verified: data.email_verified,
			githubUsername: data.username
		};
	}
});
export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET,
	scope: ['user:email', 'read:user']
});
export const googleAuth = google(auth, {
	clientId: GOOGLE_CLIENT_ID,
	clientSecret: GOOGLE_CLIENT_SECRET,
	redirectUri: 'http://localhost:5173/login/google/callback',
	scope: [
		'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile',
		'openid'
	]
});
export const facebookAuth = facebook(auth, {
	clientId: FACEBOOK_CLIENT_ID,
	clientSecret: FACEBOOK_CLIENT_SECRET,
	redirectUri: 'http://localhost:5173/login/facebook/callback',
	scope: ['email', 'public_profile']
});

export type Auth = typeof auth;
