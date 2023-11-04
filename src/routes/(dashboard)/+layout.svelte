<script lang="ts">
	import '../../app.postcss';
	import { AppShell, CodeBlock } from '@skeletonlabs/skeleton';
</script>

<AppShell
	class="card h-full p-1"
	slotSidebarLeft="grid grid-cols-1"
	slotSidebarRight="grid grid-cols-1"
	slotPageContent="grid grid-cols-1"
>
	<svelte:fragment slot="header">
		<div
			class="card variant-soft p-2 m-0.5 flex justify-center items-center overflow-hidden text-xs"
		>
			header
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div
			class="card variant-soft p-2 m-0.5 flex justify-center items-center overflow-hidden text-xs"
		>
			sidebarLeft
		</div>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<div
			class="card variant-soft-primary p-2 m-0.5 flex justify-center items-center overflow-hidden text-xs"
		>
			pageHeader
		</div>
	</svelte:fragment>
	<div
		class="card variant-soft-primary p-2 m-0.5 flex justify-center items-center overflow-hidden text-xs"
	>
		{'<slot />'}
	</div>
	<!-- --- -->
	<svelte:fragment slot="footer">
		<div
			class="card variant-soft p-2 m-0.5 flex justify-center items-center overflow-hidden text-xs"
		>
			footer
		</div>
	</svelte:fragment>
</AppShell>
