<template>
	<view class="pages bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="pa-md border-btm bg-white search-container">
			<u-search placeholder="请输入关键字" v-model="search" shape='square' :action-style="{color: '#e84b78'}" @search='searchTest' @custom='searchTest'></u-search>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="queryInfo" class="scroll-y">
			<!-- 列表 -->
			<view class="shop-item bg-white flex-row pa-md flex-jst-btw flex-ali-center" v-for="k in list"
				:key="k.product_number">
				<u-image :src='k.image' mode='scaleToFill' width="20vw" height="20vw" class="ma-rt-5"></u-image>
				<view class="shop-right flex-2 flex-column flex-jst-btw self-stretch flex-ali-start">
					<text class="shop-name text-14 text-bold">{{k.product_name}}</text>
					<view class="full-width flex-row flex-jst-btw flex-ali-center">
						<view class="shop-tag-out flex-row flex-jst-start flex-ali-center">
							<view class="shop-tag" v-for="j in k.tag" :key="j">{{j}}</view>
						</view>
						<text class="text-primary">￥{{k.sale_price}}</text>
					</view>
				</view>
			</view>
			<!-- 加载提示 -->
			<view class="ma-top-15 full-width flex-row flex-jst-center flex-ali-center">
				<u-loadmore :status="loadingStatus" :load-text="loadText" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import urls from '@/service/urls.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				search: '',
				pagenum: 1,
				pagesize: 20,
				routeInfo: undefined,
				list: [],
				loadingStatus: 'loadmore',
				loadText: {
					loadmore: '加载更多',
					loading: '正在加载',
					nomore: '这是我底线'
				}
			}
		},
		computed: {
			...mapState(['cate_component_maps'])
		},
		onShow() {
			const vm = this
			this.routeInfo = getCurrentPages().pop().options
			uni.setNavigationBarTitle({
				title: vm.routeInfo.cate_name,
				fail(err) {
					console.log(err)
				}
			})
			this.queryInfo()
		},
		methods: {
			searchTest () {
				const vm = this
				vm.pagenum = 1
				vm.list = []
				vm.loadingStatus = 'loadmore'
				vm.queryInfo()
			},
			async queryInfo() {
				const vm = this
				if (vm.loadingStatus === 'nomore') {
					return false
				}
				try {
					const obj = {
						cate_id: vm.routeInfo.cate_id,
						pagenum: vm.pagenum,
						pagesize: vm.pagesize
					}
					if (vm.search !== '') {
						obj.search = vm.search
					}
					vm.loadingStatus = 'loading'
					const res = await vm.$get(urls.whiteList.getCates, obj)
					vm.loadingStatus = 'loadmore'
					if (res.success) {
						vm.pagenum++
						if (res.data.data.length < vm.pagesize) {
							vm.loadingStatus = 'nomore'
						}
						vm.list = [...vm.list, ...res.data.data]
					}
				} catch (err) {
					vm.loading = false
					vm.$refs.uTips.show({
						title: err.message,
						type: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container{
		height: 60px;
	}
	.scroll-y{
		height: calc(100vh - 60px);
	}
	.shop-item{
		margin-top: 5px;
	}

	.shop-tag {
		padding: 2px;
		background: #f3f3f3;
		color: $uni-color-primary;

		&:not(:first-of-type) {
			margin-left: 5px;
		}
	}
</style>
