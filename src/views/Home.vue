<template>
	<div>
		<div style="" class="row">
			<div class="twelve columns">
				<h1 class="zero title" style="color: #967259">Prieta.</h1>
			</div>
		</div>
		<div class="row">
			<div class="five columns">
				<h3 style="opacity: 0.7; color: #967259">
					Easy investments in real estate through tokenizing.
				</h3>
				<router-link to="/login">
					<button class="link brown" style="width: 20em">
						Get started &rarr;
					</button>
				</router-link>
			</div>
			<div class="six columns">
				<!-- <h6 style="font-size: 1.2em; margin-bottom: 0.25em" class="zero">
					Pool into the same piece of land with multiple investors and easily
					earn passive income.
				</h6> -->

				<!-- <img src="/favicon.ico" alt=""> -->
			</div>
			<div class="one columns">&nbsp;</div>
		</div>

		<br />

		<div class="row">
			<img
				src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a2e13b153558429.63321792d1e71.jpg"
				alt=""
				style="border-radius: 2em"
			/>
		</div>

		<br />

		<div class="row">
			<div class="block seven columns">
			<br />
				<img src="/home.png" draggable="false" alt="" />
			</div>
			<div class="block five columns">
				<br />
				<br />
				<div style="padding: 0 2em">
					<h3 class="center zero" style="font-size: 2em; margin-bottom: 0.4em">
						Prieta's mobile app
					</h3>
					<div class="flex-center">
						<button class="cool" style="width: 10em; margin: 0">
							Download
						</button>
					</div>
				</div>
				<!-- <div class="flex-center"> -->
				<!-- </div> -->
				<div class="flex-center">
					<img src="/balls.png" style="position: absolute; bottom: 0" alt="" />
				</div>
			</div>
		</div>

		<br />
	</div>
</template>

<script>
import UserService from '../services/user.service'

export default {
	name: 'Home',
	data() {
		return {
			content: '',
			compname: ''
		}
	},
	methods: {
		btnclick() {
			if (this?.compname?.length > 0) {
				this.$router.push({
					path: '/create/company',
					query: { name: this.compname }
				})
			}
		}
	},
	mounted() {
		UserService.getPublicContent().then(
			(response) => {
				this.content = response.data
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
.link.brown {
	background-color: var(--green);
	color: #fff;
	&:hover {
		background-color: var(--green-dark);
	}
}

.block {
	height: 30em;
	width: 100%;
	border-radius: 2em;
	background-color: #ece0d1;
	position: relative;
}
.title {
	font-size: 5em;
	margin-top: -0.1em;
	font-family: Stardom;
}

.subtitle {
	margin-bottom: 1.5em;
	font-size: 2em;
}

img {
	width: 100%;
}
.vh {
	height: 80vh;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.brand {
	width: 75%;
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

.raisebtn {
	border-color: var(--green);
	border-radius: 0;
	border-width: 0.15em;
	height: 50px;
	padding: 0 inherit;
	margin: 0;
	background-color: var(--green);
	color: #fff;
	text-transform: none;
	font-size: 1em;
	transition: 0.3s;
	&:hover {
		background-color: var(--green-dark);
		border-color: var(--green-dark);
	}
}

.raiseinput {
	border-right: none;
	// padding: 0 !important;
	width: 25em;
	border-color: var(--green);
	border-radius: 0;
	border-width: 0.15em;
	height: 50px;
	margin: 0;
	&:active {
		outline: none;
		border-color: var(--green);
		border-radius: 0;
		border-width: 0.15em;
		border-right: none;
	}
	&:focus {
		outline: none;
		border-color: var(--green);
		border-radius: 0;
		border-width: 0.15em;
		border-right: none;
	}
}

.flexer {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>
