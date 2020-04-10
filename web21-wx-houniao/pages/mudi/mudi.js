// pages/mudi/mudi.js
let fetch = require('../../utils/getdata.js');
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
      {"id":5,"name":"南美洲","key":"SouthAmerica"},
      {"id":6,"name":"北美洲","key":"NorthAmerica"},  
    ],
    defaultZhou:1,
    zhouName:'欧洲',
    zhouKey:'Europe',
    remenArr:[],//热门数据
    qitaArr:[]//其他
  },
  //切换洲
  changeZhou:function(ev){
    console.log(ev);
    this.setData({
      defaultZhou:ev.currentTarget.dataset.id,
      zhouName:ev.currentTarget.dataset.name,
      zhouKey:ev.currentTarget.dataset.key
    })
    this.getZhoudata();
  },

  getZhoudata:function(){
    fetch.pagedata.get((type,res)=>{
      console.log(res);
      if(type == 'success'){
          this.setData({
            remenArr:res.data.hot_country_list,
            qitaArr:res.data.other_country_list
          })
      }
    },'/product/desc/CountryList/'+this.data.zhouName+'/'+this.data.zhouKey);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getZhoudata();
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