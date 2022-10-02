<template>
	<div>
		<h3 class="zero">Add Property</h3>
		<h5>Add your property to start looking for investors</h5>

		<br />

		<div class="row">
			<div class="six columns">
				<form v-if="!content" @submit.prevent="onSubmit">
					<h5 class="label">Address</h5>
					<input
						type="text"
						placeholder="Property address"
						v-model="form.address"
					/>
					<br />

					<h5 class="label">Locality</h5>
					<input
						type="text"
						placeholder="Locality"
						required
						v-model="form.locality"
					/>
					<br />

					<h5 class="label">Listing Image Link</h5>
					<input
						type="text"
						placeholder="Direct link to image"
						required
						v-model="form.img"
					/>
					<br />
					<button class="link" style="float: right" type="submit">Next</button>
				</form>
			</div>
			<div class="six columns">
				<!-- <img
					:src="
						form?.logo
							? form?.logo
							: 'https://storage.needpix.com/rsynced_images/gradient-blue.jpg'
					"
					style="border-radius: 1em"
					alt=""
				/> -->
				<div class="flex-center center">
					<img src="/brand.png" class="brand" alt="" />
					<h5 style="width: 80%; font-size: 1.4em">
						Prieta helps you get safe investments from people around the world.
					</h5>
				</div>
			</div>

			<!-- <div class="three columns">
				<br />
			</div> -->
		</div>
		<!-- <div v-if="content">
			{{ content }}
		</div> -->
		<br /><br /><br />
		<br /><br /><br />
		<br />
	</div>
</template>

<script>
import UserService from '../services/user.service'

export default {
	name: 'User',
	data() {
		return {
			form: {
				name: this?.$route?.query?.name || '',
				username: '',
				tagline: '',
				logo: ''
				// jobopen: false
			},
			content: false
		}
	},
	methods: {
		onSubmit() {
			UserService.createProperty(this.form).then(
				(response) => {
					// this.content = response.data
					console.log(response.data)
					this.$router.push(`/edit/${response?.data?.property?._id}`)
				},
				(error) => {
					this.content =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
			console.log('submit')
		}
	}
}
</script>

<style scoped>
.brand {
	width: 12em;
}

h5.label {
	font-size: 1.1em;
	margin-bottom: 0;
}

.link {
	width: 15em;
}
</style>
