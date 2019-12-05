// components/map-marker/map-marker.js
var map;
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    markers:{
      type:Array,
      value:[]
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scale:14,
    longitude:0,
    latitude:0,
    includes:[],
    mode:"map",
    startPoint:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toStartPoint(e){
      console.log(this.data.markers)
      let markers = this.data.markers
      markers.push(app.globalData.startPoint)
      console.log("起点附近", app.globalData.startPoint)
      if (app.globalData.startPoint){
        this.setData({
          longitude: app.globalData.startPoint.longitude || this.data.startPoint.longitude,
          latitude: app.globalData.startPoint.latitude || this.data.startPoint.latitude,
          markers
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请先输入起点',
          showCancel:false
        })
      }
      
    },
    changeMode(e){
      this.setData({
        mode:this.data.mode === 'list' ? 'map':'list'
      })
    },
    getCenterLocation(e){
      map.getCenterLocation({
        success:res => {
          console.log("中心点经纬度为", res.longitude,res.latitude)
        }
      })

      map.getRegion({
        success: res => {
          console.log("视野范围-西北-东南", res.northeast, res.southwest)
        }
      })

      map.getScale({
        success: res => {
          console.log("scale-", res.scale)
        }
      })
      map.includePoints({
        success: res => {
          console.log("包含的所有点-", res)
        }
      })
      map.moveToLocation({
        
        success: res => {
          console.log("移动中心到-", res)
        }
      })
    }
  },
  lifetimes: {
    attached: function() {
      map = wx.createMapContext("map-marker",this)
      
      
      wx.getLocation({
        type: 'wgs84',
        success:res => {
          const latitude = res.latitude
          const longitude = res.longitude
          const startPoint = {
            latitude : res.latitude,
            longitude : res.longitude
          }
          const speed = res.speed
          const accuracy = res.accuracy
          console.log("当前位置", latitude, longitude)
          this.setData({
            longitude,
            latitude,
            startPoint: app.globalData.startPoint || startPoint
          })
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
