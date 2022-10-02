<template>
	<div id="app">
		<div class="navcont">
			<nav :class="`nav nav-${$route.meta.title}`">
				<!-- <router-link to="/" class="nav-link">
				Home
			</router-link> -->
				<!-- <router-link v-if="showAdminBoard" to="/admin" class="nav-link"
				>Admin Board</router-link
			>
			<router-link v-if="showModeratorBoard" to="/mod" class="nav-link"
				>Moderator Board</router-link
			> -->

				<div class="mid">
					<router-link class="brandlink" to="/">
						<img
						src="/brand.png"
						style="width: 6em; "
						alt=""
					/>
						<!-- <h1
							style="
								font-size: 1.5em;
								z-index: 20;
								position: absolute;
								left: 0;
								top: 1em;
							"
						>
							Prieta.
						</h1> -->
					</router-link>
					<div class="midmid">
						<router-link v-if="currentUser" to="/discover"
							>Discover</router-link
						>
						<router-link v-if="currentUser" to="/add/property"
							>Create Listing</router-link
						>
					</div>
					<!-- <router-link v-if="currentUser" to="/threads">Threads</router-link> -->
					<div>
						<router-link v-if="!currentUser" to="/register"
							>Register</router-link
						>
						<router-link v-if="!currentUser" to="/login">Login</router-link>
					</div>
				</div>
				<!-- <router-link v-if="currentUser" to="/user" class="nav-link"
				>User</router-link
			> -->

				<router-link style="margin-right: 0" v-if="currentUser" to="/profile">
					{{ currentUser?.username || 'Profile' }}
				</router-link>

				<!-- {{ currentUser }} -->
				<!-- <a v-if="currentUser" href @click.prevent="logOut">Log out</a> -->
			</nav>
		</div>

		<div class="navcont">
			<router-view />
		</div>

		<footer class="footer">
			<div class="navcont">
				<div class="row">
					<div class="six columns">
						<!-- <a href @click.prevent target="_blank">Terms & Conditions</a> -->
						<p class="zero">&copy; Prieta.</p>
					</div>
					<div class="six columns" style="text-align: right">
						<!-- <p class="zero">Made with <span class="green">&#10084;</span> by</p> -->
						<p class="zero">Made with &hearts; by Team Prieta</p>
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	computed: {
		currentUser() {
			return this.$store.state.auth.user
		}
	},
	methods: {
		logOut() {
			this.$store.dispatch('auth/logout')
			this.$router.push('/login')
		}
	}
}
</script>

<style lang="scss">
.nav-Home {
	display: none;
}

nav.nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2em 0;
	margin-bottom: 2em;
	position: relative;
	.mid {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		z-index: 10;
		.midmid {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: -0.5em;
			a {
				z-index: 10;
				padding: 0.35em 1.25em;
				border-radius: 0.5em;
				transition: 0.3s;
				&:hover {
					background-color: #eae0d2;
				}
			}
		}
		a:not(.brandlink) {
			margin: 0 1em;
			z-index: 100;
		}
	}
}

nav a {
	margin-right: 1em;
	font-size: 1.2em;
	&:hover {
		color: var(--green);
	}
}
.nav .router-link-exact-active {
	color: var(--green) !important;
}

footer.footer {
	padding: 2em 0;
	opacity: 0.7;
}
</style>
