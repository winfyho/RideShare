// miniprogram/pages/map/map.js
import searchTools from "../../service/search.js"
import directionTools from "../../service/direction.js"
import driverTools from "../../service/driver.js"
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    directionPoint:[],

    showMap:false,
    scale:15,
    longitude:118.0,
    latitude:24.3,

    showSearchInfor:true,
    suggestion:[],

    startPoint:{},
    endPoint:{},

    searchIndex:"start",
    // include_Points:[]


    markers:[]
    
  },
  
  regionchange(e) {
    // console.log(e.type)
  },
  markertap(e) {
    // console.log(e.markerId)
  },
  controltap(e) {
    // console.log(e.controlId)
  },

  // 输入框输入对象，起点/终点
  searchFocus(e){
    this.setData({
      searchIndex: e.currentTarget.dataset.index,
      showSearchInfor:true
    })
    console.log(this.data.searchIndex,e.currentTarget.dataset.index)

    
  },
  // 关键词提示
  searchInput(e){
    // console.log('e.detail',e.detail.value)
    searchTools.getsuggest(e.detail.value, this)

  },
  // 确认点，startPoint/endPoint
  confirmPoint(e){
    console.log(e.currentTarget.dataset.point)

    if(this.data.searchIndex === "start"){
      this.setData({
        startPoint: e.currentTarget.dataset.point,
        suggestion: [],
        showSearchInfor:false

      })
    }else{
      this.setData({
        endPoint: e.currentTarget.dataset.point,
        suggestion: [],
        showSearchInfor:false

      })
    } 
  },
  confirmDirection(){
    app.globalData.startPoint = this.data.startPoint
    console.log(this.data.startPoint,this.data.endPoint)
    if (this.data.startPoint.latitude && this.data.endPoint.latitude){
      this.setData({
        showSearchInfor:false,
        showMap: true,
        longitude: this.data.startPoint.longitude,
        latitude: this.data.startPoint.latitude,
        includes:[this.data.startPoint,this.data.endPoint]
      })
      console.log("includes",this.data.includes)
      let start = {
        latitude:this.data.startPoint.latitude,
        longitude:this.data.startPoint.longitude,
      };
      let end = {
        latitude: this.data.endPoint.latitude,
        longitude: this.data.endPoint.longitude,
      }
      directionTools.getDirection(start, end,this)

    }else{
      wx.showModal({
        // title: '请输入起点和终点',
        content: '请输入起点和终点',
        showCancel:false
      })
    }
    
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '4X5BZ-ER3K5-4FKIN-QRG6Q-6Z3SO-4QBVY'
    });


    searchTools.getsuggest("厦门市", this)
    driverTools.getDriversPools(this)

    wx.getLocation({
      type: 'wgs84',
      success:res => {
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log("当前位置", latitude, longitude)
        this.setData({
          longitude,
          latitude
        })
      }
    })
    
  },

  onShow: function () {
    // 调用接口
    qqmapsdk.search({
      keyword: 'sm',
      page_size:20,
      region:'厦门市',
      success: res => {
        console.log(res.data);
        this.setData({
          searchList: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },




  onReady: function() {

  },

  
})