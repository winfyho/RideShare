function pushPassengerPool(pageObj,start,end){
  const db = wx.cloud.database();
  const passenger_pool = db.collection("passenger_pool");
  passenger_pool.add({
    // data 字段表示需新增的 JSON 数据
    data: {
      startPoint:start,
      endPoint:end
    }
  })
    .then(res => {
      wx.startPullDownRefresh()
      console.log("添加乘客成功-", start,end)
    })
}


function removePassengerPool(passenger) {
  const db = wx.cloud.database();
  const passenger_pool = db.collection("passenger_pool");
  passenger_pool.doc(passenger._id).remove()
    .then(res => {
      console.log("删除司机成功-", passenger, res)
      wx.startPullDownRefresh()
    })
}

function getPassengerPools(pageObj,page) {
  const db = wx.cloud.database();
  const passenger_pool = db.collection("passenger_pool");
  passenger_pool
    .orderBy("startPoint.latitude", "desc").orderBy("startPoint.longitude", "desc")
    .skip(page*20)
    .get()
    .then(res => {
      // let startMarkers = [];
      let endMarkers = pageObj.data.endMarkers;
      let passengers = pageObj.data.passengers;
      res.data.forEach(i => {
        // i.startPoint.iconPath = "/assets/icon/others.png";
        // i.startPoint.width = 30;
        // i.startPoint.height = 30;
        // startMarkers.push(i.startPoint)

        i.endPoint.iconPath = "/assets/icon/others.png";
        i.endPoint.width = 30;
        i.endPoint.height = 30;
        endMarkers.push(i.endPoint)
      })
      passengers = passengers.concat(res.data)
      pageObj.setData({
        passengers: passengers,
        // startMarkers: startMarkers,
        endMarkers: endMarkers
      })
      console.log("获取其他乘客-", pageObj.data.passengers)
      wx.stopPullDownRefresh()
    })
}
export default{
  pushPassengerPool,
  getPassengerPools,
  removePassengerPool
}