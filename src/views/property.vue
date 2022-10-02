<template>
	<div>
		<!-- {{ content.property }} -->
		<div
			style="display: flex; justify-content: flex-start; align-items: center"
		>
			<!-- <img
				style="width: 6em; margin-right: 1.65em"
				v-if="content?.company?.icon"
				:src="content?.company?.icon"
				alt=""
			/> -->
			<div>
				<h3 class="zero">{{ content?.property?.address || 'yo' }}</h3>
				<h5 class="zero">{{ content?.property?.locality }}</h5>
			</div>
		</div>

		<div style="margin-top: 2em" class="row">
			<div class="eight columns">
				<section id="carousel">
					<!-- v-if="
							content?.company?.images?.length > 0 && content?.company?.video
						" -->
					<div>
						<Carousel :items-to-show="1" :wrap-around="true">
							<Slide
								v-for="(slide, index) in content?.property?.other_images"
								:key="index"
								style="border-radius: 2em"
							>
								<div class="carousel__item">
									<img
										style="aspect-ratio: 16 / 9; border-radius: 2em"
										:src="slide"
										alt=""
									/>
								</div>
							</Slide>

							<template #addons>
								<Navigation />
								<Pagination />
							</template>
						</Carousel>
					</div>
				</section>

				<section id="content">
					<div class="tablist">
						<a
							@click.prevent="() => (tabsIndex = 1)"
							:class="[tabsIndex == 1 ? 'selected tab' : 'tab']"
							href
							>Overview</a
						>

						<a
							@click.prevent="() => (tabsIndex = 2)"
							:class="[tabsIndex == 2 ? 'selected tab' : 'tab']"
							href
							>Information</a
						>

						<a
							@click.prevent="() => (tabsIndex = 3)"
							:class="[tabsIndex == 3 ? 'selected tab' : 'tab']"
							href
							>Updates</a
						>

						<!-- <a
							@click.prevent="() => (tabsIndex = 4)"
							:class="[tabsIndex == 4 ? 'selected tab' : 'tab']"
							href
							>FAQs</a
						> -->
					</div>

					<div v-if="tabsIndex == 1">
						<!-- <div class="mdx" v-if="content?.company?.description">
							<Markdown :source="content?.company?.description" />
						</div> -->
						<h5 style="font-size: 1.3em">
							{{ content?.property?.description }}
						</h5>
						<!-- <p>{{ content }}</p> -->
					</div>
					<div v-if="tabsIndex == 2">
						<!-- {{ content?.company?.investment }} -->

						<div class="row">
							<div class="six columns">
								<div class="center">
									<div
										style="
											background-color: #eaeaea;
											padding: 1em;
											border-radius: 1em;
										"
									>
										<h3
											style="font-size: 2em; color: var(--green)"
											class="zero"
										>
											${{
												content?.property?.share_price
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											}}
										</h3>
										<h5 style="font-size: 1.25em" class="zero">Share Price</h5>
									</div>
								</div>

								<br />

								<div class="center">
									<div
										style="
											background-color: #eaeaea;
											padding: 1em;
											border-radius: 1em;
										"
									>
										<h3
											style="font-size: 2em; color: var(--green)"
											class="zero"
										>
											${{
												content?.property?.avg_rent
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
											}}
										</h3>
										<h5 style="font-size: 1.25em" class="zero">Average Rent</h5>
									</div>
								</div>
							</div>

							<div class="six columns">
								<div
									class="center"
									style="
										background-color: #eaeaea;
										padding: 1em;
										border-radius: 1em;
									"
								>
									<h3 style="font-size: 2em; color: var(--green)" class="zero">
										${{
											content?.property?.total_price
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}}
									</h3>
									<h5 style="font-size: 1.25em" class="zero">Property Value</h5>
								</div>
								<br />
								<div
									class="center"
									style="
										background-color: #eaeaea;
										padding: 1em;
										border-radius: 1em;
									"
								>
									<h3 style="font-size: 2em; color: var(--green)" class="zero">
										{{
											content?.property?.total_shares
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}}
									</h3>
									<h5 style="font-size: 1.25em" class="zero">Total Shares</h5>
								</div>
								<br /><br />
							</div>
						</div>
					</div>

					<div v-if="tabsIndex == 3">
						<h5>No updates for the property have been posted yet.</h5>
						<br />
						<br />
					</div>
				</section>
			</div>

			<div class="four columns">
				<div class="card">
					<h5 class="zero" style="margin-bottom: 0.3em">Investment</h5>
					<button
						class="link brown"
						style="font-size: 1.35em; border-radius: 0.5em"
						@click.prevent="showinvest = !showinvest"
					>
						<div v-if="showinvest">
							${{
								investnum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ||
								'000,000'
							}}
							<span style="opacity: 0.75"> for </span>
							<span style="color: #fff">
								{{
									parseFloat(
										(investnum /
											content?.property?.share_price /
											content?.property?.total_shares) *
											100
									).toFixed(4)
								}}%
							</span>
						</div>
						<div v-else>Invest &rarr;</div>
					</button>

					<!-- <div v-if="!content?.invested">
						<button
							v-if="!investnum"
							class="link investbtn"
							@click.prevent="showinvest = !showinvest"
						>
							Invest &rarr;
						</button>
					</div> -->

					<!-- <button class="link investbtn" v-else>
						You invested ${{
							content?.invested?.amount
								? content?.invested?.amount
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								: '000,000'
						}}
						for {{ content?.invested.percentage }}%
					</button> -->

					<div v-if="showinvest">
						<h6 class="label zero">What amount do you want to invest?</h6>
						<div
							style="
								display: flex;
								justify-content: flex-start;
								align-items: center;
								margin-bottom: 1em;
							"
						>
							<h5 class="zero" style="margin-right: 0em">$</h5>
							<input
								class="investinp zero"
								type="number"
								placeholder="100,000"
								v-model="investnum"
							/>
							<!-- :max="
									content?.company?.investment?.goal -
									content?.company?.investment?.current
								" -->
						</div>
						<div v-if="investnum">
							<p style="margin-bottom: 0.5em">
								You will own
								<span class="green"
									>{{
										parseFloat(
											(investnum /
												content?.property?.share_price /
												content?.property?.total_shares) *
												100
										).toFixed(2)
									}}%</span
								>
								of the property
							</p>
							<a
								:href="`https://untitledarhnhack.herokuapp.com/api/checkout-session?company=${
									content?.property?.address
								}&amt=${investnum}&compuser=${content?.property?._id}&percent=${
									(investnum /
										content?.property?.share_price /
										content?.property?.total_shares) *
									100
								}&userid=${currentUser?.id}&share_price=${
									content?.property?.share_price
								}`"
							>
								<button style="margin-bottom: 1.5em" class="finalinv link">
									Invest &rarr;
								</button>
							</a>
						</div>
					</div>

					<h5 class="zero" style="margin-bottom: 0.3em; margin-top: 0.5em">
						Quick links
					</h5>
					<div v-if="!content.isOwned">
						<div v-if="!content.threadStarted">
							<!-- <button class="link" @click="msg.open = !msg.open">
								Send message

							</button> -->

							<router-link :to="`/edit/${content?.property?._id}`">
								<button class="link">Edit Listing &rarr;</button>
							</router-link>

							<a href="//arhaanb.com" target="_blank">
								<button class="link">Website</button>
							</a>

							<a href="//arhaanb.com" target="_blank">
								<button class="link">Documents</button>
							</a>

							<!-- <div v-if="msg.open">
								<textarea
									name=""
									placeholder="Write your message"
									v-model="msg.msg"
									style="min-width: 100%; max-width: 100%; margin: 0"
								></textarea>
								<button
									style="margin-top: 0.5em; float: right"
									class="cool"
									@click.prevent="sendmsg()"
								>
									Send
								</button>
							</div> -->
						</div>

						<div v-else>
							<router-link :to="`/threads/${content?.threadID}`">
								<button class="link">Send message</button>
							</router-link>
						</div>
					</div>
					<a
						v-if="content?.company?.website"
						:href="content?.company?.website"
						target="_blank"
					>
						<button class="link">Website</button>
					</a>

					<a
						v-if="content?.company?.pitchdeck"
						:href="content?.company?.pitchdeck"
						target="_blank"
					>
						<button class="link">Pitch deck</button>
					</a>

					<a
						v-if="content?.company?.jobopening"
						:href="content?.company?.joblink"
						target="_blank"
					>
						<button class="link">View jobs</button>
					</a>

					<div v-if="content.isOwned">
						<h6 class="zero">You own this company</h6>
						<router-link :to="`/company/${$route?.params?.companyname}/edit`">
							<button class="link">Edit company</button>
						</router-link>
					</div>
					<h5 class="zero" style="margin-bottom: 0.3em; margin-top: 0.5em">
						Point of Contact
					</h5>
					<div class="flexer">
						<img src="https://arhaanb.com/yo.jpg" alt="" />
						<div>
							<h5 class="zero">
								{{ 'Devesh' }}
							</h5>
							<p style="font-size: 1.2em; margin-top: -0.45em; opacity: 0.75">
								{{ 'devesh@prieta.com' }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UserService from '../services/user.service'
import Markdown from 'vue3-markdown-it'

import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
	name: 'User',
	components: {
		Carousel,
		Slide,
		Pagination,
		Navigation,
		Markdown
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user
		}
	},
	data() {
		return {
			showinvest: false,
			investnum: null,
			tabsIndex: 1,
			content: '',
			user: false,
			msg: {
				open: false,
				msg: ''
			},
			invest: {
				open: false
			},
			allusers: false
		}
	},
	methods: {
		sendmsg() {
			UserService.createThread({
				content: this.msg.msg,
				p2: this.content.company.creatorID
			}).then(
				(response) => {
					// this.content = response.data
					this.$router.push('/threads')
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
			console.log(this.msg.msg)
		}
	},
	mounted() {
		UserService.getPropertyInfo(this.$route.params.propid).then(
			(response) => {
				this.content = response.data
				// console.log(this.content.company.images)
			},
			(error) => {
				// this.$router.push('/discover')
				this.content =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString()
			}
		)

		UserService.getAllUsers().then(
			(response) => {
				this.allusers = response.data
			},
			(error) => {
				this.allusers =
					(error.response &&
						error.response.data &&
						error.response.data.message) ||
					error.message ||
					error.toString()
			}
		)
	}
})
</script>

<style scoped lang="scss">
.link.brown {
	background-color: var(--green);
	color: #fff;
	&:hover {
		background-color: var(--green-dark);
	}
}

.mdx a {
	color: var(--green) !important;
	&:hover {
		color: var(--green);
	}
}

.car {
	width: 100%;
	aspect-ratio: 16 / 9;
	margin-bottom: 2em;
}

.investinp {
	border: none;
	font-size: 1.5em;
	background-color: transparent;
	&:focus {
		border: none;
	}
}
.link.investbtn {
	background-color: #d3b097;
	font-size: 1.2em;
	&:hover {
		background-color: #bd967a;
	}
}

.finalinv {
	background-color: #d3b097;
	&:hover {
		background-color: #bd967a;
	}
}

#content {
	button {
		background-color: var(--green);
	}
	.tab {
		font-size: 1.35em;
		border-bottom: solid 2px transparent;
		&:hover {
			color: var(--green);
		}
		margin-right: 2.5em;
	}
	.selected {
		color: var(--green);
		border-bottom: solid 2px var(--green);
	}
	.tablist {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 2em;
	}
	.biglabel {
		font-size: 1.5em;
		margin-bottom: 0.25em;
	}
	.flex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-top: 0.25em;
		input {
			width: auto;
			margin-right: 0.6em;
		}
		label {
			margin-top: -0.25em;
		}
	}
	input.dollar {
		font-size: 2em;
		border: none;
		padding: 0;
		margin: 0;
	}
}

.flexer {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	img {
		width: 4.25em;
		border: 2px solid var(--green);
		margin: 0;
		margin-right: 1em;
	}
	p {
		margin: 0;
	}
}

.vidpen {
	position: relative;
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
}
.video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: 0.5em;
}

img {
	width: 100%;
	border-radius: 1em;
}

.carousel__item {
	min-height: 200px;
	width: 100%;
	aspect-ratio: 16 / 9;
	background-color: #eaeaea;
	/* color: var(--vc-clr-white); */
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* .carousel__slide {
	padding: 10px;
} */

.carousel__prev,
.carousel__next {
	box-sizing: content-box;
	border: 5px solid white;
	color: #fff !important;
	&:focus {
		color: #fff !important;
		border: 5px solid white;
	}
	&:active {
		color: #fff !important;
		border: 5px solid white;
	}
	&:hover {
		border: 5px solid white;
	}
}
</style>
