<template>
	<view class="pages bg-grey">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="pa-md border-btm bg-white">
			<u-search placeholder="请输入关键字" v-model="keyword" shape='square' :action-style="{color: '#e84b78'}"></u-search>
		</view>
		<view>
			<u-swiper :list="bannerList" name='image' :height='350'></u-swiper>
		</view>
		<!-- menulist -->
		<view class="menu-list bg-white pa-row-md flex-row flex-wrap flex-jst-start flex-ali-start" v-if="menuList.length">
			<view class="menu-item-container flex-row flex-jst-center flex-ali-start" v-for="(k, index) in menuList" :key="index">
				<Item :item="k"></Item>
			</view>
		</view>
		<!-- tabbar-->
		<view class='tab-add'></view>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusTabbar from '@/cusComponents/cus-tabbar/cusTabbar.vue'
	import urls from '@/service/urls'
	import Item from './menuItem.vue'
	export default {
		components: {
			cusTabbar,
			Item
		},
		data() {
			return {
				bannerList: [],
				menuList: []
			}
		},
		onShow () {
			this.queryInfo()
		},
		methods: {
			async queryInfo () {
				const vm = this
				try {
					const res = await vm.$get(urls.whiteList.index)
					console.log(res)
					vm.bannerList = [...res.data.carousel_map]
					vm.menuList = [...res.data.menu]
				} catch (e) {
					vm.$refs.uTips.show({
						title: e.message,
						type: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.menu-list {
	// margin-top: 319.44rpx;
	padding-top: 10px;
	.menu-item-container {
		width: 33%;
		margin-bottom: 38.88rpx;
	}
}
</style>
