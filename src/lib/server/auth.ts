import { lucia } from "lucia";
import { prisma } from "@lucia-auth/adapter-prisma";
import { sveltekit } from "lucia/middleware";

import db from "./database"
import { dev } from "$app/environment"
import "lucia/polyfill/node";

export const auth = lucia({
	adapter: prisma(db, {
		user: "user",
		key: "key",
		session: "session",
	}),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			email: data.email,
			email_erified: data.email_verified 
		};
	}
	
});
export type Auth = typeof auth
