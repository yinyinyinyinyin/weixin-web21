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
			method:'POST',
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

## 7.fonticon的使用
	--7.1 进入阿里图标库 (https://www.iconfont.cn)，登录
	--7.2 将查找到的图标添加至购物车，
	--7.3 打开购物车，将图标添加至项目，
	--7.4 将项目中的图标内容下载至本地，解压到项目的根目录，图标的文件夹名称写为font
	--7.5 在main.js中引入图标
```
//引入fonticon的css文件
import './font/iconfont.css';
	```

## 8.scss配置
	--8.1 点击工具里的插件安装，安装scss的插件
	--8.2 在style标签中写上 
```	
	<style lang="scss"></style>
```

## 9.uni-app时，需要注意的地方

	--vue语法
	--页面语法使用 vue的
		-- 变量绑定、循环、判断、事件、
		组件（uni-app只支持vue单文件组件.vue 组件。其他的诸如：动态组件，自定义 render，和<script type="text/x-template"> 字符串模版等，在非H5端不支持。）
		、class、style、计算属性
		--变量在js中定义，必须使用 return的方式
		data() {
			return {
				title: 'Hello'
			}
		}
		
		--全局变量的使用：
		a.共用模块  例如： utils/getdata.js
		b.挂载 Vue.prototype  意思就是对vue实例进行属性扩展
		c.globalData 小程序中的公共变量(小程序的)
		d.vuex的使用
		e.缓存
		--事件修饰符，只支持 h5页面
		--v-html  只支持h5页面
		
		
		
	--小程序的语法	
		
		--生命周期建议使用 小程序的，页面中的 标签必须使用小程序的
		--可以自适应的css样式单位使用小程序的 rpx
	
	
	--事件处理，  小程序和vue的都支持
	 click: 'tap',
	    touchstart: 'touchstart',
	    touchmove: 'touchmove',
	    touchcancel: 'touchcancel',
	    touchend: 'touchend',
	    tap: 'tap',
	    longtap: 'longtap', //推荐使用longpress代替
	    input: 'input',
	    change: 'change',
	    submit: 'submit',
	    blur: 'blur',
	    focus: 'focus',
	    reset: 'reset',
	    confirm: 'confirm',
	    columnchange: 'columnchange',
	    linechange: 'linechange',
	    error: 'error',
	    scrolltoupper: 'scrolltoupper',
	    scrolltolower: 'scrolltolower',
	    scroll: 'scroll'
		
	--表单组件，需要使用 uni-app的表单组件
		
	--uni-app的内置组件中的事件  需要使用 @来绑定
```
<picker mode="date" :value="date" start="2015-09-01" end="2017-09-01" @change="bindDateChange">
    <view class="picker">
      当前选择: {{date}}
    </view>
</picker>
		```
		--全局组件需要在 mian.js中注册
```
import Vue from 'vue'
import pageHead from './components/page-head.vue'
Vue.component('page-head',pageHead)
		```
		--在 uni-app 中以下这些作为保留关键字，不可作为组件名。
		a\canvas\cell\content\countdown\datepicker\div\element\embed\header\image\img\
		indicator\input\link\list\loading-indicator\
		loading
		marquee
		meta
		refresh
		richtext
		script
		scrollable
		scroller
		select
		slider-neighbor
		slider
		slot
		span
		spinner
		style
		svg
		switch
		tabbar
		tabheader
		template
		text
		textarea
		timepicker
		transition-group
		transition
		video
		view
		web
		--获取上个页面传递的数据
在上个页面使用 uni.navigateTo('')传递参数
```
uni.navigateTo({
					url:'../item/index?classurl='+CategoryMemo+'&name='+CategoryName
				})
		```
		在本页面 onLoad钩子中接收 接收
```
onLoad(options) {
			console.log(options);
		},
		```
		
		--对不同的平台的判断
		#ifdef APP-PLUS
		需条件编译的代码
		#endif
		仅出现在 App 平台下的代码
		
		
		#ifndef H5
		需条件编译的代码
		#endif
		除了 H5 平台，其它平台均存在的代码
		
		
		#ifdef H5 || MP-WEIXIN
		需条件编译的代码
		#endif
		在 H5 平台或微信小程
		
		
		在 template标签中需要写成 
		<!--  #ifdef APP-PLUS--><!-- #endif-->
		
		在 js中
		//#ifdef APP-PLUS
		
		//#endif
		
		在 css中的使用方式
		/* #ifdef APP-PLUS */
		/* #endif */
		
		--跨端开发时，异常的处理
		
##10.uni-app的优化
		--10.1 建议使用 自定义组件
		--10.2 避免使用大图
		--10.3 优化数据更新
		uni ui封装了uList组件，强烈推荐开发者使用，避免自己写的不好产生性能问题
		--10.4 减少一次性渲染的节点数量 可分页显示
		--10.5 减少节点嵌套层级
		--10.6 避免视图层和逻辑层频繁进行通讯
		--10.7 优化页面切换动画
		--10.8 **优化背景色闪白**
		--10.9 使用nvue代替vue
		--10.10 优化启动速度
		--10.11 优化包体积