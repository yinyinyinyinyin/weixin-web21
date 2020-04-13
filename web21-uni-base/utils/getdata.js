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