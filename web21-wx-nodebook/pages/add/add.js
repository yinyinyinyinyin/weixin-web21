// pages/add/add.js
//引入 util.js文件
// require 可以引入js模块  
/*
模块化有三种：
AMD 实现 require.js 依赖前置
CMD 实现 sea.js     依赖就近
common.js 专门为node设置的模块化  
*/
const util = require("../../utils/util.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    time:'',
    id:0
  },
  //input框输入数据时需要触发的函数
  saveText:function(ev){
   // console.log('输入数据触发函数',ev);
    //想要获取input框中输入的数据，需要使用 ev.detail.value   
    this.setData({
      content:ev.detail.value
    })
  },
  //取消的函数
  cancelFun:function(){
    //console.log('取消');
    wx.navigateBack();
  },
  //确定的函数
  /*
  0.去掉空格
  1.验证input框中输入的数据是否合法，是否有数据
  2.添加创建这条数据的时间
  3.将数据保存到缓存
  4.跳转到 列表页
  */
  sureFun:function(){
    const content = this.data.content.trim();
    let re = /^\s$/;
    //1.验证
    if(!content || re.test(content)){
      return;
    }
    //2.添加数据的创建时间
    //console.log(util.formatTime(new Date()));
    this.setData({
      time:util.formatTime(new Date())
    })
    //3.将数据保存到缓存
    setValue(this);
    //4.页面跳转
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置添加数据的id
    this.setData({
      id:new Date().getTime()  //将日期时间对象转时间戳
    })
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


//将数据保存到 缓存
function setValue(page){
  console.log(page);
  //先获取缓存中的数据
  let arr = wx.getStorageSync('note');
  let data = [];//保存即将存到缓存的数据
  let flag = true;//true 添加  false 修改 
  if(arr.length){//有数据
    arr.forEach((item)=>{
      data.push(item);
    })
  }

  if(flag){
    data.push(page.data);
  }

  //存缓存
  wx.setStorageSync('note', data);
}