<template>
	<div>
		<div class="row">
			<!-- {{ content }} -->
			<!-- <div class="three columns">
				<img
					v-if="form?.icon"
					:src="form.icon"
					class="icon"
					:alt="`${form.compname} Icon`"
				/>
				<img
					v-else
					src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
					alt=""
					style="border: solid 2px var(--green); border-radius: 1em"
				/>
			</div> -->

			<div class="six columns">
				<img :src="content?.property?.image" style="" alt="" />
			</div>
			<div class="six columns">
				<h5 class="label">Property address</h5>
				<input
					class="biginput"
					type="text"
					v-model="form.address"
					placeholder="Address"
				/>

				<br />

				<h5 class="label tag">Locality</h5>
				<input
					type="text"
					class="smlinput"
					placeholder="Locality"
					v-model="form.locality"
				/>

				<button
					v-if="
						form.address !== content?.property?.address ||
						form.locality !== content?.property?.locality
					"
					style="margin-top: 1em"
					class="cool"
					@click.prevent="
						() => {
							content.property.name = form.compname
							content.company.tagline = form.tagline
							postCompData()
						}
					"
				>
					Save changes
				</button>
			</div>
		</div>

		<br />

		<div class="row">
			<div class="eight columns">
				<div class="tabs">
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
							>Investment</a
						>

						<!-- <a
							@click.prevent="() => (tabsIndex = 3)"
							:class="[tabsIndex == 3 ? 'selected tab' : 'tab']"
							href
							>Presentation</a
						> -->

						<!-- <a
							@click.prevent="() => (tabsIndex = 4)"
							:class="[tabsIndex == 4 ? 'selected tab' : 'tab']"
							href
							>FAQs</a
						> -->
					</div>
					<div class="panels">
						<div v-if="tabsIndex == 1">
							<section id="text">
								<h6 class="zero">Property Description</h6>
								<textarea
									style="min-width: 100%; max-width: 100%; min-height: 7em"
									v-model="form.description"
									placeholder="An elevator pitch of sorts for your investors"
								></textarea>
							</section>

							<h5 class="biglabel">Main Image</h5>
							<input
								type="text"
								placeholder="Direct link to image"
								v-model="form.image"
							/>

							<section id="images">
								<h5 class="biglabel">Images</h5>
								<div v-if="form.images.length == 0">
									<input
										type="text"
										placeholder="Image link"
										v-model="form.img.one"
									/>
									<div
										style="
											display: flex;
											justify-content: space-between;
											align-items: center;
										"
									>
										<a href @click.prevent>&nbsp;</a>
										<a
											href
											style="color: green"
											@click.prevent="
												() => {
													if (form.img.one.length > 0) {
														form.images.push(form.img.one)
														form.img.one = ''
													}
												}
											"
											>+ add image</a
										>
									</div>
								</div>
								<div v-if="form.images.length > 0">
									<div v-for="img in form.images" :key="img">
										<input
											type="text"
											placeholder="Image link"
											:value="img"
											disabled
										/>
										<!-- {{ img }} -->
									</div>
									<input
										type="text"
										placeholder="Image link"
										v-model="currentimg"
									/>
									<div
										style="
											display: flex;
											justify-content: space-between;
											align-items: center;
										"
									>
										<a
											href
											style="color: red"
											@click.prevent="
												() => {
													form.images.pop()
												}
											"
											>- remove image</a
										>
										<a
											href
											style="color: green"
											@click.prevent="
												() => {
													if (currentimg.length > 0) {
														form.images.push(currentimg)
														currentimg = ''
													}
												}
											"
											>+ add image</a
										>
									</div>
								</div>
							</section>
							<br />

							<!-- <h6 class="label">Property listing website</h6>
							<input
								type="text"
								v-model="form.website"
								placeholder="https://website.com"
							/>
							<br /> -->

							<!-- <h6 class="label">Company website</h6>
							<input
								type="text"
								v-model="form.website"
								placeholder="https://website.com"
							/>
							<br />

							<h6 class="label">Company logo</h6>
							<input
								type="text"
								v-model="form.icon"
								placeholder="Link to logo"
							/>
							<br />

							<h6 class="label">How many employees do you have?</h6>
							<input type="number" v-model="form.employees" placeholder="50" />
							<br />

							<h6 class="label">Where is your company based?</h6>
							<input
								type="text"
								v-model="form.location"
								placeholder="City, Country"
							/>
							<br />

							<h6 class="label">When was the company created?</h6>
							<input type="text" v-model="form.date" placeholder="DD/MM/YYYY" />
							<br />

							<div class="flex">
								<input
									type="checkbox"
									id="jobopen"
									name="jobopen"
									value="true"
									v-model="form.jobs.open"
								/>
								{{ form.jobs.open }}
								<label for="jobopen">Have any job openings?</label>
							</div>
							<div v-if="form.jobs.open">
								<h6 class="label">Link to recruitments webpage</h6>
								<input
									type="text"
									v-model="form.jobs.link"
									placeholder="Website"
								/>
							</div> -->

							<button
								class="cool"
								@click="
									() => {
										tabsIndex = 2
										postCompData()
									}
								"
								style="float: right"
							>
								Save
							</button>
						</div>

						<div v-if="tabsIndex == 2">
							<h6 style="font-size: 1.15em" class="label">
								What is the total property value?
							</h6>
							<div
								style="
									display: flex;
									justify-content: flex-start;
									align-items: center;
								"
							>
								<h3 style="font-size: 1.65em; margin: 0; margin-right: 0.25em">
									$
								</h3>
								<input
									type="number"
									v-model="form.total_price"
									placeholder="100,000"
									class="dollar"
									style="background-color: transparent"
								/>
							</div>
							<br />

							<h6 style="font-size: 1.15em" class="label">
								Price of a single share
							</h6>
							<div
								style="
									display: flex;
									justify-content: flex-start;
									align-items: center;
								"
							>
								<h3 style="font-size: 1.65em; margin: 0; margin-right: 0.25em">
									$
								</h3>
								<input
									type="number"
									v-model="form.share_price"
									placeholder="10"
									class="dollar"
									style="background-color: transparent"
								/>
							</div>
							<br />

							<h6 style="font-size: 1.15em" class="label">
								Total Shares
							</h6>
							<div
								style="
									display: flex;
									justify-content: flex-start;
									align-items: center;
								"
							>
								<!-- <h3 style="font-size: 1.65em; margin: 0; margin-right: 0.25em">
									$
								</h3> -->
								<input
									type="number"
									v-model="form.total_shares"
									placeholder="100,000"
									class="dollar"
									style="background-color: transparent"
								/>
							</div>
							<br />

							<h6 style="font-size: 1.15em" class="label">
								Average rent per month
							</h6>
							<div
								style="
									display: flex;
									justify-content: flex-start;
									align-items: center;
								"
							>
								<h3 style="font-size: 1.65em; margin: 0; margin-right: 0.25em">
									$
								</h3>
								<input
									type="number"
									v-model="form.avg_rent"
									placeholder="1,000"
									class="dollar"
									style="background-color: transparent"
								/>
							</div>
							<br />

							<!-- <h6 style="font-size: 1.15em" class="label">
								What percentage of your company do you want to put up?
							</h6>
							<div
								style="
									display: flex;
									justify-content: flex-start;
									align-items: center;
								"
							>
								<input
									type="number"
									v-model="form.investment.percentage"
									placeholder="00"
									class="dollar"
									style="
										width: 1.25em;
										margin-right: 0.15em;
										background-color: transparent;
									"
									min="00"
									max="99"
								/>
								<h3 style="font-size: 1.65em; margin: 0">%</h3>
							</div>
							<br /> -->

							<button
								class="cool"
								@click="
									() => {
										postCompData()
										$router.push(`/property/${this.content?.property?._id}`)
									}
								"
								style="float: right"
							>
								Save
							</button>
						</div>

						<!-- <div v-if="tabsIndex == 3">
							<h5 class="biglabel">YouTube video</h5>
							<input
								type="text"
								placeholder="YouTube link"
								v-model="form.video"
							/>

							<section id="images">
								<h5 class="biglabel">Images</h5>
								<div v-if="form.images.length == 0">
									<input
										type="text"
										placeholder="Image link"
										v-model="form.img.one"
									/>
									<div
										style="
											display: flex;
											justify-content: space-between;
											align-items: center;
										"
									>
										<a href @click.prevent>&nbsp;</a>
										<a
											href
											style="color: green"
											@click.prevent="
												() => {
													if (form.img.one.length > 0) {
														form.images.push(form.img.one)
														form.img.one = ''
													}
												}
											"
											>+ add image</a
										>
									</div>
								</div>
								<div v-if="form.images.length > 0">
									<div v-for="img in form.images" :key="img">
										<input
											type="text"
											placeholder="Image link"
											:value="img"
											disabled
										/>

									</div>
									<input
										type="text"
										placeholder="Image link"
										v-model="currentimg"
									/>
									<div
										style="
											display: flex;
											justify-content: space-between;
											align-items: center;
										"
									>
										<a
											href
											style="color: red"
											@click.prevent="
												() => {
													form.images.pop()
												}
											"
											>- remove image</a
										>
										<a
											href
											style="color: green"
											@click.prevent="
												() => {
													if (currentimg.length > 0) {
														form.images.push(currentimg)
														currentimg = ''
													}
												}
											"
											>+ add image</a
										>
									</div>
								</div>
							</section>
							<br />
							<section id="text">
								<h5 class="zero">Additional info (Markdown supported)</h5>
								<textarea
									style="min-width: 100%; max-width: 100%; min-height: 7em"
									v-model="form.additional"
									placeholder="Anything else you wanna tell investors?"
								></textarea>
							</section>

							
							<button
								class="cool"
								@click="
									() => {
										$router.push(`/company/${this.content?.company?.username}`)
										postCompData()
									}
								"
								style="float: right"
							>
								Save
							</button>
						</div> -->

						<!-- faqs tab -->
						<!-- <div v-if="tabsIndex == 4">
							Content 4
							<button
								class="cool"
								@click="() => (tabsIndex = 1)"
								style="float: right"
							>
								Save
							</button>
						</div> -->
					</div>
				</div>
				<!-- <Carousel :items-to-show="1" :wrap-around="true">
					<Slide v-for="slide in 4" :key="slide">
						<div class="carousel__item">
							<img
								src="https://res.cloudinary.com/arhaanb/image/upload/delhidesignfoundry.png"
								alt=""
							/>
						</div>
					</Slide>

					<template #addons>
						<Navigation />
						<Pagination />
					</template>
				</Carousel> -->
			</div>
			<div class="four columns">
				<div class="card">
					<div v-if="content.isOwned">
						<h5 class="zero" style="margin-bottom: 0.5em">Invite investors</h5>
						<div>
							<div class="row">
								<div class="six columns">
									<input type="text" v-model="invite.name" placeholder="Name" />
								</div>
								<div class="six columns">
									<input
										type="email"
										v-model="invite.email"
										placeholder="Email"
									/>
								</div>
							</div>
						</div>
						<p v-if="invite.success" class="green" style="margin-bottom: 0.5em">
							Invited successfully!
						</p>
						<button
							class="link"
							@click="
								() => {
									if (invite.name.length > 0 && invite.email.length > 0) {
										invite.name = ''
										invite.email = ''
										invite.success = true
									}
								}
							"
						>
							Invite
						</button>
					</div>
					<!-- <h5 class="zero">Owner</h5>
					<p>{{ content?.owner }}</p> -->
				</div>

				<!-- <div v-if="content?.company?.jobopening">
					<div class="job">
						<h5 class="zero">{{ content?.company?.name }} is hiring!</h5>
					</div>
				</div> -->
			</div>
		</div>

		<br /><br /><br />
	</div>
</template>

<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import UserService from '../services/user.service'

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
		TabGroup,
		TabList,
		Tab,
		TabPanels,
		TabPanel
	},

	data() {
		return {
			tabsIndex: 1,
			invite: {
				name: '',
				email: ''
			},
			content: '',
			user: false,
			msg: {
				open: false,
				msg: ''
			},
			invest: {
				open: false
			},
			allusers: false,
			form: {
				website: '',
				additional: '',
				employees: '',
				deck: '',
				jobs: {
					open: '',
					link: ''
				},
				compname: '',
				tagline: '',
				icon: '',
				location: '',
				date: '',
				video: '',
				images: [],
				currentimg: '',
				img: {
					one: ''
				},
				investment: {
					goal: '',
					percentage: ''
				}
			}
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
		},

		postCompData() {
			UserService.editProp(this?.form, this.content?.property?._id).then(
				(response) => {
					// this.content = response.data
					console.log(response.data)
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
		UserService.getPropertyInfo(this.$route?.params?.property).then(
			(response) => {
				this.content = response.data
				// if (!this.content.isOwned) {
				// this.$router.push('/discover')
				// }

				//setting data
				this.form.address = this?.content?.property.address
				this.form.locality = this?.content?.property.locality
				this.form.images = this?.content?.property.other_images
				this.form.share_price = this?.content?.property.share_price
				this.form.avg_rent = this?.content?.property.avg_rent
				this.form.total_shares = this?.content?.property.total_shares
				this.form.total_price = this?.content?.property.total_price
				this.form.description = this?.content?.property.description
				this.form.image = this?.content?.property?.image
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
input,
textarea {
	font-size: 1.1em;
}

.tabs {
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
		font-size: 1.2em;
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

img {
	width: 100%;
	border-radius: 0.5em;
}

.label {
	margin: 0;
}

h5.label {
	font-size: 1em;
}

.biginput {
	border: none;
	padding: 0.5em 0;
	font-size: 2em;
	background-color: transparent;
	&:focus {
		border: none;
	}
}

.label.tag {
	margin-bottom: -0.25em;
}

.smlinput {
	border: none;
	padding: 0;
	font-size: 1.35em;
	background-color: transparent;
	&:focus {
		border: none;
	}
}
</style>
