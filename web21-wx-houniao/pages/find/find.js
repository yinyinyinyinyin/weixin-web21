// pages/find/find.js
const fetch = require("../../utils/getdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sType:true,//洲和季节的显示状态
    continent:["欧洲","亚洲","非洲","北美洲","南美洲","大洋洲"],//洲
    countryArr:[],//保存洲下面的国家
    defaultCon:'欧洲'

  },
  //切换洲和季节
  changeType:function(ev){
    console.log(ev);
    this.setData({
      sType:ev.currentTarget.dataset.type
    })
  },
  //切换洲的函数
  changeCon:function(ev){
    console.log(ev);
    let name = ev.currentTarget.dataset.name;
    this.setData({
      defaultCon:name
    })
    //调用获取数据的函数
    this.getContinentData();
  },
  //获取不同洲的下面国家的数据
  getContinentData:function(){
    fetch.pagedata.get((type,res)=>{
      if(type="success"){
        this.setData({
          countryArr:res.data
        })
        console.log(this.data);
      }
    },'/requirement/destination/countries/'+this.data.defaultCon);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getContinentData();
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