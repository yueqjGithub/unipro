<template>
	<view class="cus-tab-container bg-white flex-row flex-nowrap flex-jst-ard flex-ali-center" :class="hide ? 'hide-tab' : ''">
		<view class="tab-item flex-column flex-jst-center flex-ali-center" v-for="k in tabList" :key='k.name' @click="toPage(k.path)">
			<image :src="curRoute === k.path ? k.yIcon : k.nIcon" mode="" class="tab-item-img"></image>
			<text class="tab-word" :class="curRoute === k.path ? 'text-primary' : 'text-grey'">{{k.title}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'cusTabbar',
		props: {
		},
		data() {
			return {
				hide: true,
				curRoute: 'pages/index/index',
				tabList: [{
						name: 'index',
						title: '首页',
						path: 'pages/index/index',
						yIcon: '../../static/images/index-fill.png',
						nIcon: '../../static/images/index.png',
					},
					// {
					// 	name: 'store',
					// 	path: 'pages/store/store',
					// 	yIcon: '../../static/images/car-fill.png',
					// 	nIcon: '../../static/images/car-line.png'
					// },
					// {
					// 	name: 'coin',
					// 	path: 'pages/coin/coin',
					// 	yIcon: '../../static/images/Money-fill.png',
					// 	nIcon: '../../static/images/Money-line.png'
					// },
					{
						name: 'mine',
						title: '我的',
						path: 'pages/mine/mine',
						yIcon: '../../static/images/mine-fill.png',
						nIcon: '../../static/images/mine.png'
					},
				]
			}
		},
		computed: {
			...mapState(['lang'])
		},
		mounted () {
			this.hide = false
			this.curRoute = getCurrentPages().pop().route
		},
		beforeDestroy () {
			this.hide = true
		},
		methods: {
			toPage (path) {
				uni.reLaunch({
					url: `/${path}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	.cus-tab-container {
		/* &.hide-tab{bottom: -56px;} */
		height: 56px;
		width: 100vw;
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1px solid $cus-boder-line;
		padding: 4px;
		box-sizing: border-box;
		transition: all .5s linear;
		.tab-item {
			width: 25%;
			padding: 2px;
			.tab-item-img {
				width: 25px;
				height: 25px;
			}
			.tab-word{
				font-size: 12px;
				font-weight: bold;
			}
		}
	}
</style>
