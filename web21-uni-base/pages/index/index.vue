<template>
	<view class="content">
		<!--轮播图-->
		<myswiper :swiperArr="mySwiperArr"></myswiper>
		<!--小图标-->
		<view class="icon-list">
			<view v-for="(item,index) in iconList" :key="index" class="icon-item" @click="goItem(item.CategoryMemo,item.CategoryName)">
				<image :src="require('static/icon/'+(index+1)+'.png')"></image>
				<view>{{item.CategoryName}}</view>		
			</view>
		</view>
		
		<view v-for="(item,index) in CourseforYou" :key="index" class="list">
			<image :src="item.pro_img[0].url" ></image>
		</view>
	</view>
</template>

<script>
	//引入获取数据的js
	import fetchapi from '../../utils/getdata';
	
	//引入轮播组件
	import myswiper from '../../components/main/myswiper/myswiper';
	
	export default {
		data() {
			return {
				CourseforYou:[],//为您精选
				mySwiperArr:[],
				iconList:[]
			}
		},
		onLoad() {
			//获取数据
			// uni.request({
			//     url: 'https://www.jvhv.com/siteindex.php/Index/Index.html', //仅为示例，并非真实接口地址。
			//     data: {
			//         text: 'uni.request'
			//     },
			// 	method:"POST",
			//     header: {
			//             'content-type': 'application/json' // 默认值
			//     },
			//     success: (res) => {
			//         console.log(res.data);
			//         this.text = 'request success';
			// 		this.CourseforYou = res.data.data.CourseforYou
			//     }
			// });
			
			fetchapi.pagedata.post((type,res)=>{
				console.log(res);
				this.CourseforYou = res.data.data.CourseforYou;
				this.mySwiperArr = res.data.data.top_ad.list;
				this.iconList = res.data.data.iconList;
			},'/siteindex.php/Index/Index.html',{});
		},
		methods: {
			goItem:function(CategoryMemo,CategoryName){
				console.log(CategoryMemo,CategoryName);
				uni.navigateTo({
					url:'../item/index?classurl='+CategoryMemo+'&name='+CategoryName
				})
			}
		},
		components:{//注册
			myswiper
		}
	}
</script>

<style>
	.icon-list{display: flex; justify-content: space-around; flex-wrap: wrap; border-top:#f5f5f5 solid 10px;
	border-bottom:#f5f5f5 solid 10px;}
	.icon-item{margin:32rpx; font-size:12px;}
	.icon-item view{text-align: center;}
	.icon-item image{ width:80rpx; height:80rpx; }
</style>
