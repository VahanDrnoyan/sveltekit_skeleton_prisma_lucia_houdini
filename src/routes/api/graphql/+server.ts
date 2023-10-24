import { createYoga } from 'graphql-yoga';
import type { RequestEvent } from '@sveltejs/kit';
import { makeSchema } from 'nexus';
import { helloField } from '../../../graphql';

const schema = makeSchema({ types: [helloField] });
const yogaApp = createYoga<RequestEvent>({
	schema,
	graphqlEndpoint: '/api/graphql',
	fetchAPI: globalThis,
	context() {
		return { user_id: 1 };
	}
});

export { yogaApp as GET, yogaApp as POST };
