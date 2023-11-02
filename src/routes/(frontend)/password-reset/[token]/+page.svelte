<script lang="ts">
	import FormErrorMessage from '$lib/components/FormErrorMessage.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	const { form, errors, constraints, enhance } = superForm(data.form);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="card px-4 w-auto md:w-[500px]">
			<header class="card-header p-4"><h2 class="h2">Reset password</h2></header>
			{#if $errors.password}
				<FormErrorMessage extraClasses="text-center">
					{$errors.password}
				</FormErrorMessage>
			{/if}

			<form method="post" use:enhance>
				<input
					class="input mb-4"
					title="Password"
					type="password"
					name="password"
					placeholder="Password"
					class:input-error={$errors.password}
					aria-invalid={$errors.password ? 'true' : undefined}
					bind:value={$form.password}
					{...$constraints.password}
				/>

				<footer class="card-footer mb-4 p-0 flex justify-end">
					<button type="submit" class="btn variant-filled-primary">Login</button>
				</footer>
			</form>
		</div>
	</div>
</div>
