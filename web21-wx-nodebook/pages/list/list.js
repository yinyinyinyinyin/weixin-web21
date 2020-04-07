// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[
     /* {"id":1,"content":"我们今天的天气很好！","time":"2020-04-07"},
      {"id":2,"content":"希望疫情早日结束！","time":"2020-04-08"}*/
    ]
  },
  //点击添加按钮跳转到添加页面
  add:function(){
    console.log('添加函数触发了');
    //跳转
    //navigateTo 跳转到其他页，可以返回
    wx.navigateTo({
      url: '../add/add',
    })
  },
  toLog:function(){
    //switchTab就可以跳转到tabBar的页面
    wx.switchTab({
      url: '../logs/logs',
    })
  },
  toIndex:function(){
    //跳转到下一页时，下一页没有返回按钮
    wx.redirectTo({
      url: '../add/add',
    })
  },
  /**
   * 生命周期函数--监听页面加载- 页面加载只执行一次
   */
  onLoad: function (options) {
    console.log('页面加载了');
    //获取缓存数据
   // initValue(this);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示--可以执行多次的
   */
  onShow: function () {
    //获取缓存数据
    initValue(this);
  }
})
//获取缓存数据
function initValue(page){
  let arr = wx.getStorageSync('note');
  if(arr.length){
    page.setData({
      listArr:arr
    })
  }
}