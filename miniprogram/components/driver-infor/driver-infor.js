// components/driver-infor/driver-infor.js
import driverTools from "../../service/driver.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    driver:{
      type:Object,
      value:{}
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
    deleteDriver(e){
      wx.showModal({
        content: '是否删除',
        confirmColor:"#f00",
        success:res => {
          if (res.confirm) {
            console.log('用户点击确定-司机信息-',e.currentTarget.dataset.driver)
            driverTools.removeDriverPool(e.currentTarget.dataset.driver)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  lifetimes: {
    attached: function() {
    },
    
  },
})
