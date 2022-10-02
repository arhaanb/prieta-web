<template>
	<div>
		<!-- <h3>Profile</h3> -->
		<section>
			<div class="row">
				<div class="three columns">
					<img
						:src="
							content?.user?.image ||
							imgDataUrl ||
							form.propic ||
							'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
						"
						class="profilepic"
						alt=""
					/>

					<br />
					<br />

					<button style="width: 100%" @click="show = true" class="upload link">
						Upload image
					</button>
					<button @click="logOut()" class="logout link">Logout</button>

					<br />
					<br />
				</div>

				<div class="nine columns">
					<!-- <h4 class="label zero">Name</h4> -->
					<h3 class="zero">
						{{
							content?.user?.fullname || content?.user?.username || 'username'
						}}
					</h3>

					<div class="row">
						<div class="eight columns">
							<div class="row">
								<div class="six columns">
									<div class="inv dat">
										<h3 class="zero green">
											<!-- {{ content?.investments?.length }} -->4
										</h3>
										<h5 class="zero">Investments</h5>
									</div>
								</div>

								<div class="six columns">
									<div class="com dat">
										<h3 class="zero green">
											<!-- {{ content?.companies?.length }} -->2
										</h3>
										<h5 class="zero">Properties</h5>
									</div>
								</div>
							</div>

							<div>
								<h6 class="smltitle">Edit information</h6>

								<h6 class="label">Full name</h6>
								<input
									type="text"
									v-model="form.name"
									placeholder="Full name"
								/>

								<h6 class="label">Profile picture</h6>
								<input
									type="text"
									placeholder="Profile picture link"
									v-model="form.propic"
								/>
								<button
									class="link zero upload"
									@click.prevent="addName()"
									style="float: right; width: 15em"
								>
									Save
								</button>
							</div>
						</div>

						<div class="four columns">
							<div class="qrblock card">
								<div class="flex-center">
									<qrcode-vue
										class="qr"
										size="175"
										:value="currentUser?.accessToken"
									></qrcode-vue>
									<br />
									<h5 style="font-size: 1em" class="zero center">
										Scan this to login <br />
										to the mobile app
									</h5>
								</div>
							</div>
						</div>
					</div>

					<div class="u-cf"></div>
				</div>

				<div class="row">
					<div class="eight columns">
						<div class="four columns"></div>
						<div class="u-cf"></div>
					</div>
				</div>
			</div>

			<br />
			<div class="row">
				<div class="twelve columns">
					<h6 class="smltitle zero">Your investements</h6>
					<h5 style="font-size: 1.1em; opacity: 0.7">
						Check up on the properties you have invested in.
					</h5>

					<!-- {{ myinvest }} -->
					<div class="grid">
						<div v-for="(p, index) in myinvest" :key="index">
							<router-link :to="`/property/${p?._id}`">
								<img
									class="compimg"
									:src="p?.image || '/comp.png'"
									alt=""
									style="aspect-ratio: 16 / 9"
								/>
								<h5 class="zero">{{ p?.address }}</h5>

								<div class="flexprop sml">
									<div>
										<h5 class="zero tit">Share Price</h5>
										<h5 class="zero bob">${{ p?.share_price }}</h5>
									</div>

									<div class="vr"></div>

									<div>
										<h5 class="zero tit">Property Value</h5>
										<h5 class="zero bob">
											${{
												p?.total_price
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											}}
										</h5>
									</div>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</section>

		<my-upload
			field="img"
			@crop-success="cropSuccess"
			v-model="show"
			:width="300"
			:height="300"
			img-format="png"
			langType="en"
			:noCircle="true"
		></my-upload>
	</div>
</template>

<script>
import UserService from '../services/user.service'
import myUpload from 'vue-image-crop-upload'
import QrcodeVue from 'qrcode.vue'
import axios from 'axios'

export default {
	name: 'Profile',
	computed: {
		currentUser() {
			return this.$store.state.auth.user
		}
	},
	data() {
		return {
			form: {
				name: '',
				propic: ''
			},
			myinvest: null,
			content: '',
			show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			imgDataUrl: '' // the datebase64 url of created image
		}
	},
	components: {
		'my-upload': myUpload,
		QrcodeVue
	},
	methods: {
		logOut() {
			this.$store.dispatch('auth/logout')
			this.$router.push('/login')
		},
		toggleShow() {
			this.show = !this.show
		},
		/**
		 * crop success
		 *
		 * [param] imgDataUrl
		 * [param] field
		 */
		async cropSuccess(imgDataUrl, field) {
			console.log('-------- crop success --------')
			this.imgDataUrl = imgDataUrl

			var bodyFormData = new FormData()

			bodyFormData.append('image', this.imgDataUrl)

			// axios
			// 	.post('https://api.imgur.com/3/image', bodyFormData, {
			// 		headers: {
			// 			Authorization: 'Client-ID ea3ab9016c11242'
			// 		}
			// 	})
			// 	.then((res) => {
			// 		console.log(res.data)
			// 	})
			// 	.catch((err) => {
			// 		console.log(err.message)
			// 	})
		},
		addName() {
			UserService.addNameImg(this.form.name, this.form.propic).then(
				(response) => {
					this.form.name = response.data.name
					this.form.propic = response.data.image
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
		}
	},
	mounted() {
		if (!this.currentUser) {
			this.$router.push('/login')
		}
		UserService.getProfile().then(
			(response) => {
				this.content = response.data
				this.form.name = this.content?.user?.fullname
				this.form.propic = this.content?.user?.image
				axios
					.get(
						`https://untitledarhnhack.herokuapp.com/api/property/investments/${this.content?.user?._id}`
					)
					.then((res) => {
						this.myinvest = res?.data?.data
					})
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
	}
}
</script>

<style scoped lang="scss">
.flexprop {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	.vr {
		height: 4em;
		width: 2px;
		background-color: #222;
	}
	& > div {
		margin-right: 3em;
	}
	.tit {
		text-transform: uppercase;
		font-size: 1em;
		letter-spacing: 0.1em;
		opacity: 0.6;
	}
}

.sml {
	.bob {
		font-size: 1.1em !important;
	}
	.tit {
		font-size: 0.8em;
	}
	.vr {
		border-radius: 100em;
		width: 1px;
		height: 20px;
	}
}

.qr {
	width: 100%;
}

.grid {
	display: grid;
	grid-gap: 3em;
	grid-template-columns: repeat(3, 1fr);
	img {
		border-radius: 0.75em;
	}
}

.card {
	padding: 2em;
	border: solid 2px var(--green);
	border-radius: 1em;
}

@media (max-width: 750px) {
	.grid {
		display: grid;
		grid-gap: 3em;
		grid-template-columns: repeat(1, 1fr);
	}
}

.smltitle {
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-weight: 700;
	margin-top: 2em;
}

.label {
	margin: 0;
}

.profilepic {
	border-radius: 2em;
	// width: 7em;
	// margin-right: 2em;
	// transform: translateY(2.5em);
}

.propic {
	border-radius: 100em;
	width: 7em;
	margin-right: 2em;
	transform: translateY(2.5em);
}

.logout {
	background-color: rgb(212, 77, 77);
	color: #fff;
	&:hover {
		color: #fff;
		background-color: rgb(235, 97, 97);
	}
}

.upload {
	background-color: #cacaca;
	&:hover {
		background-color: #b3b3b3;
	}
}

.name {
	transform: translateY(0.5em);
	font-weight: 700;
	font-size: 3em;
}

.flexdata {
	margin-left: 11em;
	margin-top: 1em;
}

.flex {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.dat {
	// margin-right: 2em;
	margin-top: 1em;
	h5 {
		font-size: 1.25em;
	}
	h3 {
		font-size: 2.5em;
		margin-bottom: -0.25em;
	}
}
// button {
// 	width: 15em;
// 	margin-left: 3em;
// }

.rect {
	background-color: #eaeaea;
	border-radius: 1em;
	padding: 1em 2em 0 2em;
}
</style>
