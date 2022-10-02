import axios from 'axios'
import authHeader from './auth-header'
import { baseStuff } from '../plugins/base.js'

const API_URL = `${baseStuff?.baseRoute}api/`

class UserService {
	getPublicContent() {
		return axios.get(API_URL + 'all')
	}

	//get profile
	getProfile() {
		return axios.get(API_URL + 'user', { headers: authHeader() })
	}

	//discover page
	getDiscoverPage() {
		return axios.get(API_URL + 'properties', { headers: authHeader() })
	}

	//create property
	createProperty(data) {
		console.log({data})
		return axios.post(
			API_URL + 'property/upload',
			{
				address: data.address,
				locality: data.locality,
				image: data.img
			},
			{ headers: authHeader() }
		)
	}

	//edit property
	editProp(data, id) {
		return axios.post(
			API_URL + `property/edit/${id}`,
			{
				image: data.image,
				other_images: data.images,
				desription: data.description,
				share_price: data.share_price,
				avg_rent: data.avg_rent,
				total_price: data.total_price,
				total_shares: data.total_shares,
				address: data.address,
				locality: data.locality
			},
			{ headers: authHeader() }
		)
	}

	//add name, img to user
	addNameImg(name, img) {
		return axios.post(
			API_URL + 'addnameimg',
			{
				name,
				image: img
			},
			{ headers: authHeader() }
		)
	}

	// get company info
	getPropertyInfo(id) {
		return axios.get(`${API_URL}property/${id}`, { headers: authHeader() })
	}

	// get user info
	getUserInfo(userid) {
		return axios.get(`${API_URL}user/${userid}`, { headers: authHeader() })
	}

	// get all threads
	getThreads() {
		return axios.get(`${API_URL}threads`, { headers: authHeader() })
	}

	// get all users
	getAllUsers() {
		return axios.get(`${API_URL}users`, { headers: authHeader() })
	}
}

export default new UserService()
