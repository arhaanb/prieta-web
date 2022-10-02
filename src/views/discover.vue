<template>
	<div>
		<h3 class="zero">Discover</h3>
		<h5>Start investing in <span class="green">real estate</span>.</h5>

		<br />
		<section v-if="content?.properties?.length > 0">
			<div class="row">
				<div class="block twelve columns">
					<div class="featured"></div>
					<div class="row">
						<div class="six columns">
							<img
								style="border-radius: 1em; aspect-ratio: 16 / 9"
								:src="content?.properties[0]?.image"
								alt=""
							/>
						</div>
						<div class="six columns">
							<h5 class="zero featured"><span>FEATURED</span></h5>
							<h3>{{ content?.properties[0]?.address }}</h3>

							<div class="flexprop">
								<div>
									<h5 class="zero tit">Share Price</h5>
									<h5 class="zero">
										${{ content?.properties[0]?.share_price }}
									</h5>
								</div>

								<div class="vr"></div>

								<div>
									<h5 class="zero tit">Property Value</h5>
									<h5 class="zero">
										${{
											content?.properties[0]?.total_price
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
										}}
									</h5>
								</div>
							</div>

							<router-link :to="`/property/${content?.properties[0]?._id}`">
								<button style="width: 15em; margin-top: 1.75em" class="link">
									View more &rarr;
								</button>
							</router-link>
						</div>
					</div>
					<!-- <p class="zero">{{ content.properties[0] }}</p> -->
				</div>
			</div>
		</section>

		<div class="flex-center">
			<hr style="width: 70%; margin: 3em 0em" />
		</div>

		<section id="more">
			<!-- {{ content }} -->
			<div class="recommended" v-if="content?.properties?.length > 0">
				<!-- <h6 style="letter-spacing: 0.1em; font-weight: 600">
					RECOMMENDED FOR YOU
				</h6> -->
				<div class="grid">
					<div v-for="p in content?.properties.slice(1)" :key="p">
						<!-- {{p}} -->
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
									<h5 class="zero bob">${{ p?.share_price || '?' }}</h5>
								</div>

								<div class="vr"></div>

								<div>
									<h5 class="zero tit">Property Value</h5>
									<h5 class="zero bob">
										${{
											p?.total_price
												? p?.total_price
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
												: '?'
										}}
									</h5>
								</div>
							</div>
						</router-link>
					</div>
				</div>

				<br />
			</div>
		</section>
	</div>
</template>

<script>
import UserService from '../services/user.service'

export default {
	name: 'User',
	data() {
		return {
			content: ''
		}
	},
	mounted() {
		UserService.getDiscoverPage().then(
			(response) => {
				this.content = response?.data
				console.log(this.content?.properties)
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
.compimg2 {
	width: 10em;
	margin-right: 2em;
}

.link {
	background-color: #d4d4d4 !important;
	&:hover {
		background-color: #bdbdbd !important;
	}
}

.featured {
	font-size: 1.1em;
	margin-bottom: 0.5em;
	span {
		background-color: rgb(255, 255, 164);
		padding: 0.25em 0.5em;
		border-radius: 0.25em;
	}
}

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

.block {
	background-color: #f3e9db;
	padding: 2em;
	border-radius: 2em;
}

.compimg {
	border-radius: 1em;
}

.recommended {
	a {
		margin-bottom: 2em;
	}
	.grid {
		display: grid;
		grid-gap: 3em;
		grid-template-columns: repeat(3, 1fr);
	}
}

@media (max-width: 750px) {
	.grid {
		display: grid;
		grid-gap: 3em;
		grid-template-columns: repeat(1, 1fr);
	}
}
</style>
