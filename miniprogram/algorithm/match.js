import {
  fitness
} from "../algorithm/fitness .js"
import {
  evaluation
}from "../algorithm/evaluation.js"

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
  let oldResult = [];
  let newResult = [];
  let finalResult = [];



  let T = 100; //初始温度
  let delT = -2; // 变化温度
  let minT = 0; // 温度阈值
  const L = endPoints.length; // 每个温度下的迭代次数L



  for (let i = T; i > minT; i += delT) {

    // 每个温度下迭代40次（endPoints.length）
    endPoints.forEach(i => {

      let fit = fitness(i, groupIndexs, lineGroup)
      // console.log(fit,i)
      i.a_dis = fit;
      if (fit === -1 || fit === 3) {
        i.iconPath = "/assets/icon/fail.png"
        fail.push(i)
      } else {
        i.iconPath = "/assets/icon/driver_icon.png"
        success.push(i)
      }
    })
    // console.log(success,fail)
    success.sort(function (a, b) { return a.a_dis - b.a_dis  })

    oldResult = newResult;
    newResult = [];

    success.forEach(i => {

      // 获取新解
      if (newResult.length < 3) {
        i.iconPath = "/assets/icon/others.png"
        newResult.push(i)
      }
    })


    // 评价函数,判断是否接收新解
    finalResult = evaluation(oldResult, newResult)
    markers = success.concat(fail)
    markers = markers.concat(finalResult)

    
    success = [];
    fail = [];
  }
  finalResult.sort(function (a, b) { return b.latitude- a.latitude  })
  console.log(finalResult, markers)

  return {
    markers,
    finalResult
  }

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