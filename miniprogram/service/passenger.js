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
export default{
  pushPassengerPool,
}