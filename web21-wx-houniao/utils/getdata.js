//封装request
//封装的优势：减少代码量、优化程序，将获取数据中公共的东西提取出来，作为一个文件来调用
//还可以实现加载中...的效果
//baseapi
const apiurl = "https://www.51houniao.com";

const pagedata = {
  get(callback,url){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url:apiurl+url,
      header:{
        'content-type': 'application/json' // 默认值
      },
      method:'GET',
      success:function(res){
        //隐藏提示信息
        wx.hideLoading();
        //写回调函数
        callback('success',res);
      },
      fail:function(err){
        wx.hideLoading();
        console.log(err);
      }
    })
  },
  post(callback,url,data){
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url:apiurl+url,
      header:{
        'content-type': 'application/json' // 默认值
      },
      data:data,
      method:'POST',
      success:function(res){
        //隐藏提示信息
        wx.hideLoading();
        //写回调函数
        callback('success',res);
      },
      fail:function(err){
        wx.hideLoading();
        console.log(err);
      }
    })
  }

}

//输出
module.exports = {
  pagedata:pagedata
}
