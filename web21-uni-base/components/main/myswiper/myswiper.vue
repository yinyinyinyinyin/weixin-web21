<template>
	<view>
		 <swiper class="swiper" 
		 :indicator-dots="indicatorDots" 
		 :autoplay="autoplay" 
		 :interval="interval" 
		 :duration="duration"
		 :circular="circular">
			<swiper-item v-for="(item,index) in swiperArr" :key="index">
				<view class="swiper-item uni-bg-red">
					<image :src="item.adlist_img"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default{
		props:{//接收从父组件传过来的参数
			swiperArr:{
				type:Array,
				value:[]
			}
		},
		//在uni-app中一定要写成下面的形式
		data(){
			return {
				indicatorDots:true,
				autoplay:true,
				interval:2000,
				duration:1000,
				circular:true
			}
		}
	}
</script>
<style>
	.swiper{width:100%; height:340rpx;  }
	.swiper-item image{width: 100%; height:340rpx; }
</style>
