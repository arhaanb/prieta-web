import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
const Profile = () => import('./views/Profile.vue')
const Discover = () => import('./views/discover.vue')
const createproperty = () => import('./views/createproperty.vue')
const property = () => import('./views/property.vue')
const editproperty = () => import('./views/editproperty.vue')
const success = () => import('./views/success.vue')

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: { title: 'Home' }
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile
	},
	// {
	{
		path: '/discover',
		name: 'discover',
		component: Discover
	},
	{
		path: '/add/property',
		name: 'createproperty',
		component: createproperty
	},
	{
		path: '/property/:propid',
		name: 'property',
		component: property
	},
	{
		path: '/edit/:property',
		name: 'editproperty',
		component: editproperty
	},
	{
		path: '/success',
		name: 'success',
		component: success
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router
