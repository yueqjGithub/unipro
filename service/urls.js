const baseUrl = 'http://wechatapi.apiself.com/v1/api'
const urls = {
	baseUrl: baseUrl,
	whiteList: {
		index: '/index/index',
		getCates: '/cate/index',
		mobileArea: '/mobilerecharge/qcellcore', // 归属地查询
		mobilePrice: '/mobilerecharge/index', // 面额列表
	}
}
export default urls
