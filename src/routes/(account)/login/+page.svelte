<script lang="ts">
	import FormErrorMessage from '$lib/components/FormErrorMessage.svelte';
	import SocialLogin from '$lib/components/SocialLogin.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, constraints, enhance } = superForm(data.form);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="card w-auto md:w-[500px]">
			<form method={'POST'} use:enhance>
				<header class="card-header p-4"><h2 class="h2">Login</h2></header>
				{#if $errors.email}
					<FormErrorMessage extraClasses="text-center">
						{$errors.email}
					</FormErrorMessage>
				{/if}

				<section class="p-4">
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

					<input
						class="input"
						title="Password"
						type="password"
						name="password"
						placeholder="Password"
						class:input-error={$errors.password}
						aria-invalid={$errors.password ? 'true' : undefined}
						bind:value={$form.password}
						{...$constraints.password}
					/>
				</section>
				<footer class="card-footer mb-4 flex justify-between px-4">
					<a href="/password-reset">Forgot password?</a>
					<button type="submit" class="btn variant-filled-primary">Login</button>
				</footer>
			</form>
			<SocialLogin />
		</div>
	</div>
</div>
