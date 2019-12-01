function pushDriverPool(point) {
  const db = wx.cloud.database();
  const driver_pool = db.collection("driver_pool");
  driver_pool.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        point:point
      }
    })
    .then(res => {
      wx.startPullDownRefresh()
      console.log("添加司机成功-",point)
    })
}

function getDriversPools(pageObj){
  const db = wx.cloud.database();
  const driver_pool = db.collection("driver_pool");
  driver_pool.orderBy("point.latitude", "desc").orderBy("point.longitude", "desc")
   .get()
    .then(res => {
      // console.log("获取所有司机-", res.data)
      let markers = pageObj.data.markers;
      res.data.forEach( i => {
        i.point.iconPath = "/assets/icon/driver_icon.png";
        i.point.width = 40;
        i.point.height = 40;
        markers.push(i.point)
      })
      pageObj.setData({
        drivers: res.data,
        markers:markers
      })
      console.log("获取所有司机-", pageObj.data.drivers, markers)
      wx.stopPullDownRefresh()
    })
}

export default {
  pushDriverPool,
  getDriversPools
}