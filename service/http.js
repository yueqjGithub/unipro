import urls from './urls.js'
const Fly = require("flyio/dist/npm/wx")
const fly = new Fly()
import Store from '@/store/index.js'



fly.config.baseURL = urls.baseUrl
fly.config.timeout = 20000
//添加请求拦截器
fly.interceptors.request.use(request => {
	// console.log(request)
	fly.lock();
	if (wx.getStorageSync('token')) {
		// 给所有请求添加自定义header
		request.headers = {
			...request.headers,
		  'content-type': 'application/x-www-form-urlencoded',
		  'X-Tag': 'flyio',
		  'token': wx.getStorageSync('token')
		};
		fly.unlock();//解锁请求
	} else {
		fly.unlock();//解锁请求
	}
	return request
})

fly.interceptors.response.use(response => {
	const status = response.status
	if (status >= 200 && status < 300) {
		if (response.data.code === 40024 || response.data.code === 40023) {
			uni.clearStorageSync('token')
			Store.dispatch('setLoginStatus', false)
			uni.navigateTo({
				url: '/pages/login/login',
				fail(reason) {
					console.log(reason)
				}
			})
		} else {
			return response.data
		}
	}
}, err => {
	const status = err.status || ''
	if (status === 401) {
		uni.showToast({
			title: 'jwt_express',
			duration: 3000,
			icon: 'none'
		})
		// initFunc()
	} else if (status === 404) {
		uni.showToast({
			title: 'jwt_express',
			icon: 'none'
		})
		// initFunc()
	} else {
		uni.showToast({
			title: '请求出错',
			duration: 3000,
			icon: 'none'
		})
	}
})

const httpPost = (url, data) => {
	return fly.request(url, data, {
		method: 'post'
	})
}

const httpGet = (url, params) => {
	return fly.request({
		url: url,
		method: 'get',
		params
	})
}

export { httpPost, httpGet }