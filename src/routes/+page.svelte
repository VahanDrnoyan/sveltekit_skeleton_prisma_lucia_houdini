<script lang="ts">
	import '../app.postcss';
export let data;
console.log(data.user?.id, 123)
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="h1">TrueFans</h1>
		<h2 class="h2">is your bookmarks managing and sharing tool.</h2>
		<div class="flex justify-center space-x-2">
			{#if data.user?.id}
				<a class="btn variant-filled" href="/dashboard" target="_blank" rel="noreferrer">
					Dashboard
				</a>
				<form action="?/logout" method="post" use:enhance>
					<button type="submit" class="btn variant-filled">Logout</button>
				</form>
			{:else}
				<a class="btn variant-filled" href="/login" target="_blank" rel="noreferrer"> Log In </a>
				<a class="btn variant-filled" href="/register" target="_blank" rel="noreferrer">
					Sign Up
				</a>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	figure svg,
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
			glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
