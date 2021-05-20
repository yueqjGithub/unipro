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
		<!-- list -->
		<view class="ma-top-10 bg-white"> 
			<view class="list-tit border-btm flex-row flex-jst-btw flex-ali-center pa-md">
				<text class="text-14 text-bold">商家推荐</text>
				<!-- <text class="text-12">更多</text> -->
			</view>
			<view class="shop-item flex-row pa-md flex-jst-btw flex-ali-center" v-for="k in shopList" :key="k.product_number">
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
				menuList: [],
				shopList: []
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
					vm.bannerList = [...res.data.carousel_map]
					vm.menuList = [...res.data.menu]
					vm.shopList = [...res.data.recommend]
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
.shop-tag{
	padding: 2px;
	background: #f3f3f3;
	color: $uni-color-primary;
	&:not(:first-of-type){
		margin-left: 5px;
	}
}
</style>
