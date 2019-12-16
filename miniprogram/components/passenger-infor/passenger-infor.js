// components/passenger-infor/passenger-infor.js
import passengerTools from "../../service/passenger.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    passenger:{
      type:Object,
      value:{}
    },
    num:{
      type:Number,
      value:0
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
    deletePassenger(e){
      wx.showModal({
        content: '是否删除',
        confirmColor:"#f00",
        success:res => {
          if (res.confirm) {
            console.log('用户点击确定-乘客信息-',e.currentTarget.dataset.passenger)
            passengerTools.removePassengerPool(e.currentTarget.dataset.passenger)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})
