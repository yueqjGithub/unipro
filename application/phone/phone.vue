<template>
	<view class="bg-grey pages">
		<u-top-tips ref="uTips"></u-top-tips>
		<view class="phone-container bg-white pa-md flex-row flex-jst-center flex-ali-center">
			<view class="flex-1"></view>
			<view class="flex-3">
				<u-input v-model="p_number" type="number" placeholder="请输入电话号码"
				:custom-style="{fontSize: '18px', fontWight: 'bold', textAlign: 'center', color: '#e84b78'}"
				:maxlength="15"
				:clearable="false"
				/>
			</view>
			<view class="flex-1 text-right text-primary text-12">{{area}}</view>
		</view>
		<!-- 面额列表 -->
		<view class="ma-top-10 bg-white">
			<view class="list-tit border-btm flex-row flex-jst-btw flex-ali-center pa-md">
				<text class="text-14 text-bold">面额选择</text>
				<!-- <text class="text-12">更多</text> -->
			</view>
			<view class="price-container pa-md">
				<view v-if="curPriceList.length > 0">
					<view class="face-list flex-row flex-wrap flex-jst-start flex-ali-start full-width">
						<view class="face-item flex-row flex-jst-center flex-ali-center" v-for="(k, idx) in curPriceList" :key="idx" :class="idx === currentFace && 'cur-face'">
							<text class="text-12 text-bold">￥</text>
							<text class="text-20 text-bold">{{k.face_value}}</text>
						</view>
					</view>
				</view>
				<view class="full-height full-width flex-row flex-jst-center flex-ali-center" v-else>
					<u-empty text="请输入电话号码获取充值面额" mode="list"></u-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { _debounce } from '@/utils/utils.js'
	import urls from '@/service/urls.js'
	export default {
		data() {
			return {
				p_number: undefined,
				area: '',
				priceList: null,
				currentFace: undefined,
				maps: [
					{ key: 'lt', target: '联通' },
					{ key: 'yd', target: '移动' },
					{ key: 'dx', target: '电信' }
				]
			};
		},
		onShow () {
			this.queryPriceList()
		},
		computed: {
			curPriceList () {
				const vm = this
				const key = vm.area && vm.maps.find(item => vm.area.includes(item.target)).key
				return vm.priceList ? vm.priceList[key] : []
			}
		},
		watch: {
			p_number: {
				handler: function (val) {
					const vm = this
					if (this.$u.test.mobile(val)) {
						_debounce(vm.findArea(val), 500)
					}
				}
			}
		},
		methods: {
			async queryPriceList () {
				const vm = this
				try {
					const res = await vm.$get(urls.whiteList.mobilePrice)
					if (res.success) {
						vm.priceList = res.data
					} else {
						vm.$refs.uTips.show({
							title: err.message,
							type: 'error'
						})
					}
				} catch (err) {
					vm.$refs.uTips.show({
						title: err.message,
						type: 'error'
					})
				}
			},
			async findArea (val) {
				const vm = this
				const obj = {
					mobile: val
				}
				try {
					const res = await vm.$get(urls.whiteList.mobileArea, obj)
					if (res.success) {
						vm.area = res.data
					} else {
						vm.$refs.uTips.show({
							title: res.message,
							type: 'error'
						})
					}
				} catch (err) {
					vm.$refs.uTips.show({
						title: err.message,
						type: 'error'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.price-container{
	.face-list {
		.face-item {
			width: 30%;
			height: 80px;
			margin: 0 1.6% 15px 1.6%;
			box-sizing: border-box;
			border: 1px solid #D0D0D0;
			border-radius: 13.88rpx;
	
			&.cur-face {
				border-color: $uni-color-primary;
				color: $uni-color-primary;
				border-width: 2px;
			}
		}
	}
}
</style>
