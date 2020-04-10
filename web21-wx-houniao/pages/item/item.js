// pages/item/item.js
const fetch = require("../../utils/getdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",//产品id
    productObj:{},//产品数据
    itemType:false,//title是否显示  false 不显示 ，true显示
    gaiyaoType:false,//行程概要是否是点亮状态 false没点亮，true点亮了
    xiangxiType:false,
    jiageType:false,
    gaiyaoTop:0,//行程概要内容里顶部的距离，默认值为0
    xiangxiTop:0,
    jiageTop:0
  },
  //拨打电话的功能
  bodadianhua:function(){
    wx.makePhoneCall({
      phoneNumber: '4008810706',
    })
  },
  //客服功能需要 后台配置，然后才能使用
  handleContact (e) {
      console.log(e.detail.path)
      console.log(e.detail.query)
  },
  //点击跳转到首页
  goHome:function(){
    wx.switchTab({
      url: '/pages/main/main',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let id = options.id;
    if(id == undefined){
      id = '1fdab5ebeb9644359f296c9697aab32a';
    }
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

      //获取行程概要内容、详细行程内容、价格说明内容离顶部的距离
    wx.createSelectorQuery().select('#gaiyao').boundingClientRect((rect)=>{
      this.setData({gaiyaoTop:rect.top})
    }).exec();
    wx.createSelectorQuery().select('#xiangxi').boundingClientRect((rect)=>{
      this.setData({xiangxiTop:rect.top})
    }).exec();
    wx.createSelectorQuery().select('#jiage').boundingClientRect((rect)=>{
      this.setData({jiageTop:rect.top})
    }).exec();



    },'/product/product/getProductDetails/'+id);

    

  },
  //滚动时触发的钩子函数
  onPageScroll:function(res){
    console.log("滚动触发了",res);
    let scrollTop = res.scrollTop+50;
    //res.scrollTop  滚动时离顶部的距离
    if(scrollTop >= this.data.gaiyaoTop && scrollTop < this.data.xiangxiTop){
      this.setData({
        itemType:true,
        gaiyaoType:true,
        xiangxiType:false,
        jiageType:false
      })
    }else if(scrollTop >=this.data.xiangxiTop && scrollTop < this.data.jiageTop){
      this.setData({
        gaiyaoType:false,
        xiangxiType:true,
        jiageType:false
      })
    }else if(scrollTop >= this.data.jiageTop ){
      this.setData({
        gaiyaoType:false,
        xiangxiType:false,
        jiageType:true
      })
    }else{
      this.setData({
        itemType:false
      })
    }
  }
  


})