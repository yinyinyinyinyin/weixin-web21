// pages/mudi/mudi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhouArr:[
      {"id":1,"name":"欧洲","key":"Europe"},
      {"id":2,"name":"亚洲","key":"Asia"},
      {"id":3,"name":"非洲","key":"Africa"},
      {"id":4,"name":"大洋洲","key":"Oceania"},
      {"id":5,"name":"南美洲","key":"NorthAmerica"},
      {"id":6,"name":"北美洲","key":"SouthAmerica"},
    ],
    defaultZhou:1,
    zhouName:'欧洲',
    zhouKey:'Europe',
    zhouDataArr:[]//不同的洲下面的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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