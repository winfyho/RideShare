import {
  fitness
} from "../algorithm/fitness .js"

function init(polyline, passengers) {

  let endPoints = getEndPoints(passengers)
  console.log("所有乘客终点passengers-endPoints", endPoints)

  let polylineInfor = getPolylineInfor(polyline)
  console.log("路线信息line-infor", polylineInfor)

  let lineGroup = groupByLatitude(polyline)
  console.log("路线按纬度分组line-groupby-latitude", lineGroup)

  let groupIndexs = getGroupIndexs(lineGroup)
  console.log("分组索引-groupIndexs", groupIndexs)

  let markers = [];
  let success = [];
  let fail = [];
  endPoints.forEach(i => {

    let fit = fitness(i, groupIndexs, lineGroup)
    // console.log(fit,i)
    if (fit === -1) {
      i.iconPath = "/assets/icon/fail.png"
      fail.push(i)
    } else {
      i.iconPath = "/assets/icon/others.png"

      success.push(i)
    }
  })
  markers = success.concat(fail)
  // console.log(success, fail, markers)

  return markers

}






// 获取所有乘客的终点
function getEndPoints(passengers) {
  let endPoints = []
  passengers.forEach(i => {
    let end = {
      latitude: i.endPoint.latitude,
      longitude: i.endPoint.longitude,
      title: i.endPoint.title
    }
    endPoints.push(end)
  })
  // console.log(polyline, endPoints)
  return endPoints
}


// 路线按纬度分组
function groupByLatitude(polyline) {
  let n = 0;
  let lineGroup = [
    []
  ]
  let groupStart = polyline[0]
  polyline.forEach((i, index) => {

    // 判断纬度差是否超过1km
    if (Math.abs((i.latitude - groupStart.latitude) * 111 * 1000) < 1000) {
      lineGroup[n].push(i)
    } else {
      groupStart = i;
      n++;
      lineGroup.push([])
    }
  })
  return lineGroup
}

function getGroupIndexs(lineGroup) {
  // 获取分组索性，便于快速定位
  let groupIndexs = []
  lineGroup.forEach((i, n) => {
    let min = i[0].latitude;
    let max = i[0].latitude;
    i.forEach(item => {
      min = min > item.latitude ? item.latitude : min;
      max = max < item.latitude ? item.latitude : max;
    })
    groupIndexs.push({
      s: max,
      e: min,
    })
  })
  return groupIndexs
}

function getPolylineInfor(polyline) {
  let start = polyline[0];
  let end = polyline[polyline.length - 1];
  return {
    start,
    end,
    width: (start.latitude - end.latitude) * 111 * 1000,
    height: (end.longitude - start.longitude) * 111 * 1000
  }
}

export default {
  init
}