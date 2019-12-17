// pages/passengers/passengers.js
import passengerTools from "../../service/passenger.js"
import direction from "../../service/direction.js"
import searchOthers from "../../algorithm/searchOthers.js"
import match from "../../algorithm/match.js"
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passengers: [],
    startMarkers: [],
    endMarkers: [],
    mode: "map",
    polyline: [],
    center: {

      latitude: 24.50100921,
      longitude: 118.126908841,
      title: "SM城市广场",
    }
    // distance:0

  },
  // 添加乘客到数据库
  confirmPassenger(res) {
    // console.log(res.detail)
    passengerTools.pushPassengerPool(this, res.detail.startPoint, res.detail.endPoint)
  },

  changeMode(res) {
    console.log(res.detail.mode)
    if (res.detail.mode === "list") {
      this.setData({
        mode: "list"
      })
    } else if (res.detail.mode === "map") {
      this.setData({
        mode: "map"
      })
    }
  },

  test() {
    console.log(this.data.polyline)
    let polyline = this.data.polyline
    polyline[0].color = "#0059ff88"
    polyline[0].width = 6

    let option = match.init(this.data.polyline[0].points, this.data.passengers)
    app.globalData.matchPassengers = option.finalResult
    console.log("匹配到乘客：", app.globalData.matchPassengers)

    let markers = option.markers
    markers.forEach(i => {
      i.width = 30
      i.height = 30
    })
    this.setData({
      endMarkers: option.markers,
      polyline
    })


  },
  confirmResult(e){
    wx.switchTab({
      url: '/pages/map/map'
    })
  },
  onShow: function() {
    console.log("onshow",app.globalData)
    this.setData({
      polyline: app.globalData.polyline
    })
    

  },

  onLoad: function(options) {
    
    // direction.getDirection({
    //   // 默认光前体育馆
    //   latitude: 24.5829,
    //   longitude: 118.09443
    // }, {
    //   // 默认镇海路（地铁站）
    //   latitude: 24.450615,
    //   longitude: 118.082859
    // }, this)

    wx.startPullDownRefresh()







  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    passengerTools.getPassengerPools(this, 0)
    passengerTools.getPassengerPools(this, 1)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})