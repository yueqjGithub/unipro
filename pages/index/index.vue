<template>
	<view class="page">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="pa-md border-btm">
			<u-search placeholder="请输入关键字" v-model="keyword" shape='square' :action-style="{color: '#e84b78'}"></u-search>
		</view>
	</view>
</template>

<script>
	import urls from '@/service/urls'
	export default {
		data() {
			return {
				bannerList: []
			}
		},
		onShow () {
			// this.queryInfo()
		},
		methods: {
			async queryInfo () {
				const vm = this
				try {
					const res = await vm.$post(urls.baseUrl)
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
</style>
