import { setSession } from "$houdini"
import { auth } from "$lib/server/auth"
import { getSessionUserFromDb } from "$lib/server/database"
import type { Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"


/* @type { import('@sveltejs/kit').Handle } */
export const HouDiniHandler: Handle = async ({ event, resolve }) => {
    // get the user information however you want
    const session = await event.locals.auth.validate()
    // set the session information for this event
	if(session && session.user){
    setSession(event, { user: await getSessionUserFromDb(session.user.userId) })
	}

    // pass the event onto the default handle
    return await resolve(event)
}

export const LuciaAuthHandler: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event)
	return await resolve(event)
}
export const handle = sequence(LuciaAuthHandler, HouDiniHandler);