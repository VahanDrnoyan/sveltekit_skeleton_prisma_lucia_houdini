<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from '../profile/$types';

	export let data: PageData;
</script>

<h1>Profile</h1>
<p>User id: {data.user?.id}</p>
<p>GitHub username: {data.user?.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>
