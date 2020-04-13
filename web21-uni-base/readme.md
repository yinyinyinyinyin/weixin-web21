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
