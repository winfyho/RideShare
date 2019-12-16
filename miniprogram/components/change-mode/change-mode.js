// components/change-mode/change-mode.js
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
    showMode: "map"
  },
  
  
  methods: {
    changeMode(e) {
      this.setData({
        showMode: this.data.showMode === 'map' ? 'list' : 'map'
      })
      // console.log("change mode", this.data.showMode)
      this.triggerEvent('changeMode', { mode:this.data.showMode})
    },
  }
})
