<script lang="ts">
	import FormErrorMessage from '$lib/components/FormErrorMessage.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	const { form, errors, constraints, enhance } = superForm(data.form);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="card p-4 w-auto md:w-[500px]">
			<header class="card-header pb-4"><h2 class="h2">Forgot password?</h2></header>
			{#if $errors.email}
				<FormErrorMessage extraClasses="text-center">
					{$errors.email}
				</FormErrorMessage>
			{/if}
			<form method="post" use:enhance>
				<input
					class="input mb-4"
					title="Email"
					type="email"
					name="email"
					placeholder="Email"
					class:input-error={$errors.email}
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
					{...$constraints.email}
				/>

				<footer class="card-footer flex justify-end p-0">
					<button type="submit" class="btn variant-filled-primary">Send link</button>
				</footer>
			</form>
		</div>
	</div>
</div>
