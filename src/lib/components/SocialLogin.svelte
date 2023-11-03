<script lang="ts">
	import { IconBrandGithub } from '@tabler/icons-svelte';
	import { IconBrandGoogle } from '@tabler/icons-svelte';
	import { IconBrandFacebook } from '@tabler/icons-svelte';
</script>

<h2>Or</h2>
<div class="flex flex-col">
	<a href="/login/github" class="btn variant-filled-primary border-b border-gray-600">
		<span><IconBrandGithub size={24} /></span>
		<span>Login with Github</span>
	</a>
	<a href="/login/google" class="btn variant-filled-primary border-b border-gray-600">
		<span><IconBrandGoogle size={24} /></span>
		<span>Login with Google</span>
	</a>
	<a href="/login/facebook" class="btn variant-filled-primary">
		<span><IconBrandFacebook size={24} /></span>
		<span>Login with Facebook</span>
	</a>
</div>
