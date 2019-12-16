// pages/passengers/passengers.js
import passengerTools from "../../service/passenger.js"
import direction from "../../service/direction.js"
import searchOthers from "../../algorithm/searchOthers.js"
import match from "../../algorithm/match.js"
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

    let markers = match.init(this.data.polyline[0].points, this.data.passengers)
    markers.forEach(i => {
      i.width = 30
      i.height = 30
    })
    this.setData({
      endMarkers: markers,
      polyline
    })
    console.log(this.data.endMarkers)


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    passengerTools.getPassengerPools(this)
    direction.getDirection({
      latitude: 24.56629,
longitude: 118.09267
    }, {
        latitude: 24.5132,
longitude: 118.14649
    }, this)

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
  onShow: function() {

  },

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
    passengerTools.getPassengerPools(this)

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