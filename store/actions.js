export const checkLogin = async (context) => {
	const token = await uni.getStorageSync('token')
	if (token && token !== '') {
		return token
	} else {
		return false
	}
}

export const setLoginStatus = async (context, payload) => {
	// 设置登录状态
	context.commit('setLoginStatus', payload)
}