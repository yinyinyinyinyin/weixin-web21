// pages/main/main.js
//引入获取数据的封装函数
const fetch = require("../../utils/getdata.js"); 


Page({

  /**
   * 页面的初始数据
   */
  data: {
    tuijianArr:[],//推荐数据
    lunboArr:[]//轮播数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url:'https://www.51houniao.com/product/product/getProductRecommendUser',
    //   method:'POST',
    //   data:{desc: false,
    //     orderBy: "top",
    //     pageNow: 1,
    //     pageSize: 20,
    //     seller_user_id: "4bc4027c645343f09a964b5c2e9f875b"},
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success:(res)=>{
    //       console.log(res);
    //       this.setData({
    //         tuijianArr:res.data
    //       })
    //     }
    // })
    //使用封装好的获取数据的函数获取推荐的数据
    //post函数有三个参数：回调函数，url地址，需要传给后台的data
    let _this = this;
    fetch.pagedata.post(function(type,res){
      console.log(type,res);
      if(type==='success'){
        _this.setData({
          tuijianArr:res.data
        })
      }
    },'/product/product/getProductRecommendUser',{desc: false,orderBy: "top",pageNow: 1,pageSize: 20,seller_user_id: "4bc4027c645343f09a964b5c2e9f875b"});
    
    //获取轮播数据
    fetch.pagedata.get(function(type,res){
      if(type === 'success'){
        _this.setData({
          lunboArr:res.data
        })
        console.log(_this.data);
      }
    },'/product/banner/getBySeller/4bc4027c645343f09a964b5c2e9f875b');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})