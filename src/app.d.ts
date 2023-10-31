// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
/// <reference types="lucia-auth" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/auth').Auth
		type UserAttributes = {
			username: string
		}
	}
	type DatabaseUserAttributes = {
		email: string;
		email_verified: boolean;
	};
	type DatabaseSessionAttributes = Record<string, never>;
}

declare namespace App {
	interface Locals {
		auth: import('lucia-auth')
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
