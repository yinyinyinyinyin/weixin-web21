// components/newcom/newcom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mydata:{
      type:String,
      value:''
    },
    myNum:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //修改父组件的myNum值的函数
    changeNum:function(){
      //设定值
      this.setData({
        myNum:666
      });
        const myEventDetail = {myNum:this.data.myNum};//detail对象，提供给事件监听函数
        const myEventOption = {};//触发事件的选项
        //主动触发事件
        this.triggerEvent('myevent',myEventDetail,myEventOption);
    }
  }
})
