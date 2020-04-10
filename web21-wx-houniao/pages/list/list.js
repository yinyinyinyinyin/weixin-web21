// pages/list/list.js

//引入获取数据的插件
const fetch = require("../../utils/getdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',
    dingzhiArr:[],
    page:1,//当前页下标
    endType:false//true到底了，false没有到底
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.searchText == ""){
      options.searchText = "中国";
    }
    this.setData({
      searchText:options.searchText
    })

    //获取数据
   this.getDingzhiData();
  },
  //获取数据的函数
  getDingzhiData:function(){
    fetch.pagedata.post((type,res)=>{
      console.log(res);
        this.setData({
          dingzhiArr:res.data.matchedProducts
        })
    },'/requirement/request/getMatchedProducts',{curPagePath: "/wx/customer/classic/search.html?pageid=db76wbJTJZitCft6qMfx",keyWord:this.data.searchText,pageNow: 1,pageSize: 10,product_type: 1});

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作，必须在json中配置允许下拉刷新
   */
  onPullDownRefresh: function () {
    console.log("下拉刷新触发了");
    //重新获取数据
    this.getDingzhiData();
    //数据获取后停止下拉刷新
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log( '触底加载');
    if(!this.data.endType){
      this.setData({
        page:this.data.page+1
      })
      //触底加载时，加载下一页的数据
      fetch.pagedata.post((type,res)=>{
        console.log(res);
          if(res.data.matchedProducts.length != 0){
            //旧数据
            let olddata = this.data.dingzhiArr;
            let newdata = olddata.concat(res.data.matchedProducts);
            this.setData({
              dingzhiArr:newdata
            })
          }else{
            this.setData({
              endType:true
            })
          }
         
      },'/requirement/request/getMatchedProducts',{curPagePath: "/wx/customer/classic/search.html?pageid=db76wbJTJZitCft6qMfx",keyWord:this.data.searchText,pageNow: this.data.page,pageSize: 10,product_type: 1});
    }
    
  }
})