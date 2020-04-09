// pages/item/item.js
const fetch = require("../../utils/getdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",//产品id
    productObj:{}//产品数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const id = options.id;
    this.setData({
      id:id
    })

    //获取数据
    const _this = this;
    fetch.pagedata.get(function(type,res){
      console.log(res);
      _this.setData({
        productObj:res.data
      })
    },'/product/product/getProductDetails/'+id);

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