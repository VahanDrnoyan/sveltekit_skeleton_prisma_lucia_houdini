<script lang="ts">
	import { enhance } from '$app/forms';
	import FormErrorMessage from '$lib/components/FormErrorMessage.svelte';
	export let data;
	console.log(data);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="card px-4 w-auto md:w-[500px]">
			<header class="card-header p-4"><h2 class="h2">Email verification</h2></header>
			{#if !data.user?.email}
				<FormErrorMessage>Email is missing</FormErrorMessage>
			{/if}
			<p class="mb-8">Your email verification link was sent to your inbox.</p>
			<form method="post" use:enhance>
				<footer class="card-footer mb-4 p-0 flex justify-between">
					<h2>Resend verification link</h2>
					<button type="submit" class="btn variant-filled-primary">Resend</button>
				</footer>
			</form>
		</div>
	</div>
</div>
