<template>
	<main>
		<br /><br /><br /><br />
		<h2 class="green zero">Congratulations!</h2>
		<h5 class="zero">
			You successfully invested
			<span class="green">${{ $route.query?.amt }}</span> to
			<span class="green">{{ $route.query?.company }}</span
			>!
		</h5>
		<h5>
			You own <span class="green">{{ $route.query?.percent }}%</span> of the
			property.
		</h5>

		<h5 style="font-size: 1.2em">
			<router-link :to="`/property/${$route?.query?.compuser}`">
				View property &rarr;
			</router-link>
		</h5>
		<br /><br /><br />
		<br /><br /><br />
		<br /><br /><br />
		<br /><br />
	</main>
</template>

<script>
export default {}
</script>

<style scoped></style>
