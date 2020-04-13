##1.创建4个页面
pages/index/index.vue
```
<template>
	<view class="content">
		<view v-for="(item,index) in CourseforYou" :key="index">
			<image :src="item.pro_img[0].url" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CourseforYou:[]
			}
		},
		onLoad() {
			//获取数据
			uni.request({
			    url: 'https://www.jvhv.com/siteindex.php/Index/Index.html', //仅为示例，并非真实接口地址。
			    data: {
			        text: 'uni.request'
			    },
				method:"POST",
			    header: {
			            'content-type': 'application/json' // 默认值
			    },
			    success: (res) => {
			        console.log(res.data);
			        this.text = 'request success';
					this.CourseforYou = res.data.data.CourseforYou
			    }
			});
		},
		methods: {

		}
	}
</script>

<style>
</style>
```

pages/find/index.vue
```
<template>
	<view class="content">
		发现页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
```
pages/message/index.vue
```
<template>
	<view class="content">
		消息页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
```
pages/mine/index.vue
```
<template>
	<view class="content">
		我的页面
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
```

## 2. 将图片放到 static/icon文件夹中
## 3.配置路由，配置底部导航
pages.json
```
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "加减号"
			}
		},
		{
			"path": "pages/find/index",
			"style": {
				"navigationBarTitleText": "发现"
			}
		},
		{
			"path": "pages/message/index",
			"style": {
				"navigationBarTitleText": "消息"
			}
		},
		{
			"path": "pages/mine/index",
			"style": {
				"navigationBarTitleText": "我的"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar":{
		"color":"#333",
		"selectedColor":"#005bac",
		"list":[
			{
				"pagePath":"pages/index/index",
				"text":"首页",
				"iconPath":"static/icon/footer_1.png",
				"selectedIconPath":"static/icon/footer_1_red.png"
			},
			{
				"pagePath":"pages/find/index",
				"text":"发现",
				"iconPath":"static/icon/footer_2.png",
				"selectedIconPath":"static/icon/footer_2_red.png"
			},
			{
				"pagePath":"pages/message/index",
				"text":"消息",
				"iconPath":"static/icon/footer_3.png",
				"selectedIconPath":"static/icon/footer_3_red.png"
			},
			{
				"pagePath":"pages/mine/index",
				"text":"我的",
				"iconPath":"static/icon/footer_4.png",
				"selectedIconPath":"static/icon/footer_4_red.png"
			}
		]
	}
}
```


## 4.组件  
	--4.1 创建组件  components/main/myswiper/myswiper.vue
```
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
	```
	--4.2在 pages/index/index.vue中引入组件，并使用他
```
//引入轮播组件
	import myswiper from '../../components/main/myswiper/myswiper';
	```
```<!--轮播图-->
	<myswiper :swiperArr="mySwiperArr"></myswiper>
```	

注册：
```
components:{//注册
			myswiper
		}
```
	
	
	
## 5.获取数据的封装
	--5.1创建获取数据的js文件 utils/getdata.js
```
//api地址
const apiurl = "https://www.jvhv.com";
const pagedata = {
	get(callback,url){
		uni.showLoading({
		    title: '加载中'
		});
		uni.request({
			url:apiurl+url,
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:function(res){
				uni.hideLoading();
				callback('success',res);
			},
			fail:function(res){
				uni.hideLoading();
				console.log(err);
			}
		})
	},
	post(callback,url,data){
		uni.showLoading({
		    title: '加载中'
		});
		uni.request({
			url:apiurl+url,
			data:data,
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:function(res){
				uni.hideLoading();
				callback('success',res);
				
			},
			fail:function(res){
				uni.hideLoading();
				console.log(err);
			}
		})
	}
}

module.exports = {
	pagedata:pagedata
}
	 ```
	--5.2 在页面中的使用  pages/index/index.vue
	script标签中使用
```
//引入获取数据的js
	import fetchapi from '../../utils/getdata';
	onLoad() {
		//获取数据
		fetchapi.pagedata.post((type,res)=>{
			console.log(res);
			this.CourseforYou = res.data.data.CourseforYou;
			this.mySwiperArr = res.data.data.top_ad.list;
			this.iconList = res.data.data.iconList;
		},'/siteindex.php/Index/Index.html',{});
	},

	```
	
## 6.小图标渲染，和页面间传参
	--6.1 创建item页面 pages/item/index.vue
```
<template>
	<view class="content">
		item页面
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
			//接收的从首页传过来的参数
			console.log(options);
		},
		methods: {

		}
	}
</script>

<style>
</style>

	```
	--6.2首页的页面跳转和传参  pages/index/index.vue
	javascript:
```
		data() {
			return {
				CourseforYou:[],//为您精选
				mySwiperArr:[],
				iconList:[]//小图标
			}
		},
		methods: {
			goItem:function(CategoryMemo,CategoryName){
				console.log(CategoryMemo,CategoryName);
				uni.navigateTo({
					url:'../item/index?classurl='+CategoryMemo+'&name='+CategoryName
				})
			}
		},
	```
template:
```
<!--小图标-->
		<view class="icon-list">
			<view v-for="(item,index) in iconList" :key="index" class="icon-item" @click="goItem(item.CategoryMemo,item.CategoryName)">
				<image :src="require('static/icon/'+(index+1)+'.png')"></image>
				<view>{{item.CategoryName}}</view>		
			</view>
		</view>
```

## .fonticon的使用

## .scss配置

## .uni-app时，需要注意的地方

	--vue语法
	
	--小程序的语法
