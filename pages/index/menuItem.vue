<template>
	<view class="menu-item flex-column flex-ali-center flex-jst-start" @click="toPage(item)">
		<view class="menu-icon flex-row flex-jst-center flex-ali-center">
			<u-icon :name="item.image" color="#ffffff" size="50" custom-prefix="fonticon"></u-icon>
		</view>
		<text class="menu-name">{{item.name}}</text>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'menuItem',
		props: ['item'],
		data() {
			return {}
		},
		computed: {
			...mapState(['lang']),
			// bg() {
			// 	return 'red'
			// }
			// bg() {
			// 	return `linear-gradient(-55deg,${this.item.apply_start_background},${this.item.apply_end_background})`
			// },
		},
		methods: {
			toPage (path) {
				uni.navigateTo({
					url: path.path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-item {
		.menu-icon {
			width: 90.27rpx;
			height: 90.27rpx;
			border-radius: 50%;
			position: relative;
			background: linear-gradient(-55deg, #df7077, #df7b95);
			box-shadow: 0px 1px 2px 1px #df7b95;
		}
		.menu-name{
			margin-top: 6px;
			font-size: 12px;
		}
	}
</style>
