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
  //删除
  del:function(ev){
    console.log(ev);
    const id = ev.currentTarget.dataset.id;
    const that = this;
    //弹出模态框，是否确认删除
    wx.showModal({
      title: '确认删除',
      content: '请确认是否要删除这条记录？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          //删除缓存中的相应数据，重新渲染页面
          //console.log(this);
          delValue(that,id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //修改函数
  /*点击修改函数时，需要带该条记录的id号，跳转到add.js 传参
  */
  edit:function(ev){
    const id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../add/add?id='+id,  //将参数传递给 add页面
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
  console.log(page.data.listArr);
}

//删除缓存的相应记录
function delValue(page,id){
  //找到将要删除的记录，将其从缓存中剔除
  var arr = wx.getStorageSync('note');
  var data = [];
  if(arr.length){
    arr.forEach((item=>{
      if(id !== item.id){//不是要删除的记录
        data.push(item);
      }
    }))
    //将data重新存入缓存
    wx.setStorageSync('note', data);
    //setData
    page.setData({
      listArr:data
    })
  }
}