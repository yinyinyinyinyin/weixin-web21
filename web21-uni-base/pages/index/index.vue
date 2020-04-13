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
