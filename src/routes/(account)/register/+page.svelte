<script>
	import FormErrorMessage from '$lib/components/FormErrorMessage.svelte';
	import SocialLogin from '$lib/components/SocialLogin.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	const { form, errors, constraints, enhance } = superForm(data.form);
	console.log($errors)
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="card w-auto md:w-[500px]">
			<form use:enhance method="POST">
				<header class="card-header p-4"><h2 class="h2">Register</h2></header>
				<section class="p-4">
					<input
						class="input mb-4"
						title="Name"
						name="username"
						type="text"
						placeholder="Name"
						class:input-error={$errors.username}
						aria-invalid={$errors.username ? 'true' : undefined}
						bind:value={$form.username}
						{...$constraints.username}
					/>
					{#if $errors.username}
						<FormErrorMessage>
							{$errors.username}
						</FormErrorMessage>
					{/if}

					<input
						class="input mb-4"
						title="Email"
						name="email"
						type="text"
						placeholder="Email"
						class:input-error={$errors.email}
						aria-invalid={$errors.email ? 'true' : undefined}
						bind:value={$form.email}
						{...$constraints.email}
					/>
					{#if $errors.email}
						<FormErrorMessage>
							{$errors.email}
						</FormErrorMessage>
					{/if}
					<input
						class="input mb-4"
						title="Password"
						name="password"
						type="password"
						placeholder="Password"
						class:input-error={$errors.password}
						aria-invalid={$errors.password ? 'true' : undefined}
						bind:value={$form.password}
						{...$constraints.password}
					/>
					{#if $errors.password}
						<FormErrorMessage>
							{$errors.password}
						</FormErrorMessage>
					{/if}

					<input
						class="input"
						title="Password repeat"
						type="password"
						placeholder="Password repeat"
						name="password_repeat"
						class:input-error={$errors.password_repeat}
						aria-invalid={$errors.password_repeat ? 'true' : undefined}
						bind:value={$form.password_repeat}
						{...$constraints.password_repeat}
					/>
					{#if $errors.password_repeat}
						<FormErrorMessage extraClasses="mt-4">
							{$errors.password_repeat}
						</FormErrorMessage>
					{/if}
				</section>
				<footer class="card-footer mb-4 flex justify-end px-4">
					<button type="submit" class="btn variant-filled-primary">Register</button>
				</footer>
			</form>
			<SocialLogin />
		</div>
	</div>
</div>
