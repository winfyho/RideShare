// components/search-bar/search-bar.js
import searchTools from "../../service/search.js"
import passengerTools from "../../service/passenger.js"
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


    showSearchInfor: true,
    showSearchBar  : true,
    suggestion: [],

    startPoint: {},
    endPoint: {},

    searchIndex: "start",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSearchBar(e){
      let showSearchBar = this.data.showSearchBar === true ? false : true;
      this.setData({
        showSearchBar,
      })
    },
    // 输入框输入对象，起点/终点
    searchFocus(e) {
      this.setData({
        searchIndex: e.currentTarget.dataset.index,
        showSearchInfor: true
      })
      console.log(this.data.searchIndex, e.currentTarget.dataset.index)


    },
    // 关键词提示
    searchInput(e) {
      // console.log('e.detail',e.detail.value)
      searchTools.getsuggest(e.detail.value, this)

    },
    // 确认点，startPoint/endPoint
    confirmPoint(e) {
      console.log(e.currentTarget.dataset.point)

      if (this.data.searchIndex === "start") {
        this.setData({
          startPoint: e.currentTarget.dataset.point,
          suggestion: [],
          showSearchInfor: false

        })
      } else {
        this.setData({
          endPoint: e.currentTarget.dataset.point,
          suggestion: [],
          showSearchInfor: false

        })
      }
    },
    confirmResult(e){
      this.setData({
        showSearchBar: false,
      })
      this.triggerEvent('confirm', {
        startPoint: this.data.startPoint,
        endPoint: this.data.endPoint
      })
    }
  }
})
