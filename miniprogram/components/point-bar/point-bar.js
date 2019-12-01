// components/point-bar/point-bar.js
import searchTools from "../../service/search.js"
import driverTools from "../../service/driver.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    point:{},
    showSearchInfor:true,
    suggestion:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchInput(e){
      console.log("point-bar",e.detail.value)
      searchTools.getsuggest(e.detail.value,this)
    },
    searchFocus(e){
      this.setData({
        showSearchInfor: true,
      })
      console.log('focus');
      searchTools.getsuggest("厦门", this)

    },
    choosePoint(e){
      this.setData({
        point:e.currentTarget.dataset.point,
        showSearchInfor:false,
      })
      console.log(e.currentTarget.dataset.point,this.data.point)

    },
    confirmPoint(e){
      if(this.data.point.latitude && this.data.point.longitude){
        driverTools.pushDriverPool(this.data.point)
        // this.triggerEvent('refresh', {})

      }else{
        wx.showModal({
          // title: '请输入起点和终点',
          content: '重新输入位置',
          showCancel:false
        })
      }
    }
  },

  
})
