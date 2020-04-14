<template>
	
	<view class="content">
		item页面
		<view class="uni-list">
		    <view class="uni-list-cell">
		        <view class="uni-list-cell-navigate uni-navigate-right" v-for="(item,index) in 10" :key="index">
		            {{item}}
		        </view>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad(options) {
			console.log(options);
		},
		methods: {

		},
		
	}
</script>

<style>
</style>
